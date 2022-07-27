// License MIT @zenn-dev/zenn-editor, Technote
// @see https://github.com/zenn-dev/zenn-editor

import type { Settings } from '$/domain/app/settings';
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
import { getRandomString } from '^/lib/helpers/random';
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
    @inject('Settings') private settings: Settings,
    @inject('IColorService') private color: IColorService,
    @inject('ISlack') private slack: ISlack,
  ) {
  }

  private async __process(str: string, referrer: string): Promise<string> {
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
      const id = `blog-card-${getRandomString()}`;
      const iframeUrl = this.settings.oembed?.getUrl ? this.settings.oembed.getUrl(encodeURIComponent(str), id, encodeURIComponent(referrer), str) : undefined;
      if (iframeUrl) {
        return `<div class="blog-card"><iframe src="${iframeUrl}" frameborder="0" scrolling="no" loading="lazy" data-id="${id}"></iframe></div>`;
      }

      return `<div><a href="${str}" target="_blank" rel="noreferrer noopener">${str}</a></div>`;
    }

    return str;
  }

  // TODO: Add test
  public async process(str: string, referrer: string): Promise<string> {
    const key = `${str}::${referrer}`;
    if (!(key in OembedService.__cache)) {
      OembedService.__cache[key] = await this.__process(decodeUrlHtmlEntity(str), referrer);
    }

    return OembedService.__cache[key];
  }
}
