// License MIT @zenn-dev/zenn-editor, Technote
// @see https://github.com/zenn-dev/zenn-editor

import type { IColorService } from '$/domain/post/service/color';
import type { IOembedService } from '$/domain/post/service/oembed';
import type { ISlack } from '$/domain/shared/library/slack';
import ReactDOMServer from 'react-dom/server';
import { singleton, inject } from 'tsyringe';
import { decodeUrlHtmlEntity } from '@/lib/helpers/string';
import {
  isJsfiddleUrl,
  isCodepenUrl,
  isCodesandboxUrl,
  isStackblitzUrl,
  isTweetUrl,
  isYoutubeUrl,
  isValidHttpUrl,
} from '@/lib/helpers/url';
import CodePen from './components/CodePen';
import CodeSandbox from './components/CodeSandbox';
import JsFiddle from './components/JsFiddle';
import StackBlitz from './components/StackBlitz';
import Tweet from './components/Tweet';
import YouTube from './components/YouTube';

@singleton()
export class OembedService implements IOembedService {
  private static __cache: Record<string, string> = {};

  public constructor(
    @inject('IColorService') private color: IColorService,
    @inject('ISlack') private slack: ISlack,
  ) {
  }

  private static async __process(str: string): Promise<string> {
    if (isJsfiddleUrl(str)) {
      return ReactDOMServer.renderToString(<JsFiddle url={str}/>);
    }

    if (isCodepenUrl(str)) {
      return ReactDOMServer.renderToString(<CodePen url={str}/>);
    }

    if (isCodesandboxUrl(str)) {
      return ReactDOMServer.renderToString(<CodeSandbox url={str}/>);
    }

    if (isStackblitzUrl(str)) {
      return ReactDOMServer.renderToString(<StackBlitz url={str}/>);
    }

    if (isTweetUrl(str)) {
      return ReactDOMServer.renderToString(<Tweet url={str}/>);
    }

    if (isYoutubeUrl(str)) {
      const rendered = ReactDOMServer.renderToString(<YouTube url={str}/>);
      if (rendered) {
        return rendered;
      }
    }

    if (isValidHttpUrl(str)) {
      return `<div class="blog-card"><iframe src="/card/${encodeURIComponent(str)}" frameborder="0" scrolling="no" loading="lazy"></iframe></div>`;
    }

    return str;
  }

  // TODO: Add test
  public async process(str: string): Promise<string> {
    if (!(str in OembedService.__cache)) {
      OembedService.__cache[str] = await OembedService.__process(decodeUrlHtmlEntity(str));
    }

    return OembedService.__cache[str];
  }
}
