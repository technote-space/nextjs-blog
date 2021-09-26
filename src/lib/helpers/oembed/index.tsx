// License MIT @zenn-dev/zenn-editor, Technote
// @see https://github.com/zenn-dev/zenn-editor

import ReactDOMServer from 'react-dom/server';
import urlMetadata from 'url-metadata';
import { decode } from 'html-entities';
import {
  isJsfiddleUrl,
  isCodepenUrl,
  isCodesandboxUrl,
  isStackblitzUrl,
  isTweetUrl,
  isYoutubeUrl,
  isValidHttpUrl,
  getDomainName,
} from '@/lib/helpers/url';
import { getDominantColor } from '@/lib/helpers/color';
import { escapeHtml } from '@/lib/helpers/string';
import BlogCard from '@/lib/helpers/oembed/components/BlogCard';
import Tweet from '@/lib/helpers/oembed/components/Tweet';
import StackBlitz from '@/lib/helpers/oembed/components/StackBlitz';
import CodeSandbox from '@/lib/helpers/oembed/components/CodeSandbox';
import CodePen from '@/lib/helpers/oembed/components/CodePen';
import JsFiddle from '@/lib/helpers/oembed/components/JsFiddle';
import YouTube from '@/lib/helpers/oembed/components/YouTube';

export class Oembed {
  private static __cache: Record<string, string> = {};

  private static async __parse(str: string): Promise<string> {
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
        return Oembed.generateCard(str, metadata.title, description, metadata.image, metadata.canonical, metadata.source);
      } catch (e) {
        console.log(e);
        if (e instanceof Error && /getaddrinfo ENOTFOUND/.test(e.message)) {
          // ドメインも死んでるっぽい
          return `<div style="text-decoration: line-through">${str}</div>`;
        }
        return Oembed.generateCard(str);
      }
    }

    return str;
  }

  private static async generateCard(url: string, title?: string, description?: string, image?: string, canonical?: string, source?: string): Promise<string> {
    const _image = image || `https://s.wordpress.com/mshots/v1/${escapeHtml(url)}?w=380&h=200`;
    const dominantColor = await getDominantColor(_image, getDomainName(url));

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
  public static async parse(str: string): Promise<string> {
    if (!(str in Oembed.__cache)) {
      Oembed.__cache[str] = await Oembed.__parse(decode(str));
    }

    return Oembed.__cache[str];
  }
}
