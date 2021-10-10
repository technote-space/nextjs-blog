// License MIT @zenn-dev/zenn-editor, Technote
// @see https://github.com/zenn-dev/zenn-editor

import type { IColorService } from '$/domain/post/service/color';
import type { IOembedService } from '$/domain/post/service/oembed';
import dynamic from 'next/dynamic';
import ReactDOMServer from 'react-dom/server';
import { singleton, inject } from 'tsyringe';
import urlMetadata from 'url-metadata';
import { decodeUrlHtmlEntity, escapeHtml } from '@/lib/helpers/string';
import {
  isJsfiddleUrl,
  isCodepenUrl,
  isCodesandboxUrl,
  isStackblitzUrl,
  isTweetUrl,
  isYoutubeUrl,
  isValidHttpUrl,
  getSiteUrl,
} from '@/lib/helpers/url';

const BlogCard = dynamic(() => import('./components/BlogCard'));
const CodePen = dynamic(() => import('./components/CodePen'));
const CodeSandbox = dynamic(() => import('./components/CodeSandbox'));
const JsFiddle = dynamic(() => import('./components/JsFiddle'));
const StackBlitz = dynamic(() => import('./components/StackBlitz'));
const Tweet = dynamic(() => import('./components/Tweet'));
const YouTube = dynamic(() => import('./components/YouTube'));

@singleton()
export class OembedService implements IOembedService {
  private static __cache: Record<string, string> = {};

  public constructor(
    @inject('IColorService') private color: IColorService,
  ) {
  }

  private async __process(str: string): Promise<string> {
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
      try {
        const metadata = await urlMetadata(str) as urlMetadata.Result & { 'zenn:description'?: string };
        const description = metadata.description.length > 120 ? `${metadata.description.substr(0, 120)}...` : metadata.description;
        return this.generateCard(str, metadata.title, description, metadata.image, metadata.canonical, metadata.source);
      } catch (e) {
        console.log(e);
        if (e instanceof Error && /getaddrinfo ENOTFOUND/.test(e.message)) {
          // ドメインも死んでるっぽい
          return `<a href="${str}" style="text-decoration: line-through">${str}</a>`;
        }
        return this.generateCard(str);
      }
    }

    return str;
  }

  private async generateCard(url: string, title?: string, description?: string, image?: string, canonical?: string, source?: string): Promise<string> {
    const _image = image || `https://s.wordpress.com/mshots/v1/${escapeHtml(url)}?w=380&h=200`;
    const dominantColor = await this.color.getDominantColor(_image, getSiteUrl(url));

    return ReactDOMServer.renderToString(<BlogCard
      url={url}
      title={title}
      description={description}
      image={_image}
      dominantColor={dominantColor?.value}
      canonical={canonical}
      source={source}
    />);
  }

  // TODO: Add test
  public async process(str: string): Promise<string> {
    if (!(str in OembedService.__cache)) {
      OembedService.__cache[str] = await this.__process(decodeUrlHtmlEntity(str));
    }

    return OembedService.__cache[str];
  }
}
