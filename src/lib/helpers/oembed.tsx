// License MIT @zenn-dev/zenn-editor, Technote
// @see https://github.com/zenn-dev/zenn-editor

import urlMetadata from 'url-metadata';
import { decode } from 'html-entities';
import {
  isJsfiddleUrl,
  isCodepenUrl,
  isCodesandboxUrl,
  isStackblitzUrl,
  isTweetUrl,
  isYoutubeUrl,
  extractYoutubeVideoParameters,
  isValidHttpUrl, getDomainName,
} from '@/lib/helpers/url';
import { getDominantColor } from '@/lib/helpers/color';
import { escapeHtml } from '@/lib/helpers/string';

export class Oembed {
  private static __cache: Record<string, string> = {};

  private static escapeHtml(str: string) {
    if (/[&<>"]/.test(str)) {
      return str.replace(/[&<>"]/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
      }[char] ?? char));
    }
    return str;
  }

  private static async __parse(str: string): Promise<string> {
    if (isJsfiddleUrl(str)) {
      const url = str.includes('embed') ? str : `${str.replace(/\/$/, '')}/embedded/`;
      return `<div class="embed-jsfiddle" style="width:100%;padding-bottom:56.25%;height:0;position:relative"><iframe src="${url}" style="position:absolute;top:0;left:0;width:100%;height:100%" scrolling="no" frameborder="no" allowfullscreen allowtransparency="true" loading="lazy"></iframe></div>`;
    }

    if (isCodepenUrl(str)) {
      const url = new URL(str.replace('/pen/', '/embed/'));
      url.searchParams.set('embed-version', '2');
      return `<div class="embed-codepen" style="width:100%;padding-bottom:56.25%;height:0;position:relative"><iframe src="${url}" style="position:absolute;top:0;left:0;width:100%;height:100%" scrolling="no" scrolling="no" frameborder="no" allowtransparency="true" loading="lazy"></iframe></div>`;
    }

    if (isCodesandboxUrl(str)) {
      return `<div class="embed-codesandbox" style="width:100%;padding-bottom:56.25%;height:0;position:relative"><iframe src="${str}" style="position:absolute;top:0;left:0;width:100%;height:100%" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" loading="lazy" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe></div>`;
    }

    if (isStackblitzUrl(str)) {
      const url = str.includes('embed') ? str : `${str.includes('?') ? `${str}&embed=1` : `${str}?embed=1`}`;
      return `<div class="embed-stackblitz" style="width:100%;padding-bottom:56.25%;height:0;position:relative"><iframe src="${url}" style="position:absolute;top:0;left:0;width:100%;height:100%" scrolling="no" frameborder="no" allowtransparency="true" loading="lazy" allowfullscreen></iframe></div>`;
    }

    if (isTweetUrl(str)) {
      const id = str.replace(/^https:\/\/twitter\.com\/[a-zA-Z0-9_-]+\/status\/([a-zA-Z0-9?=]+)$/, '$1');
      return `<div class="enbed-tweet"><iframe id="twitter-widget-${id}" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position:static;visibility:visible;width:450px;max-width:100%;height:660px;max-height:calc(100vw * 1.6);display:block;flex-grow:1;" title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?embedId=twitter-widget-${id}&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=${id}&amp;theme=light&amp;widgetsVersion=1890d59c%3A1627936082797&amp;width=450px"></iframe></div>`;
    }

    if (isYoutubeUrl(str)) {
      const params = extractYoutubeVideoParameters(str);
      if (params) {
        const escapedVideoId = Oembed.escapeHtml(params.videoId);
        const time = Math.min(Number(params.start || 0), 48 * 60 * 60);
        const startQuery = time ? `&start=${time}` : '';
        return `<div class="embed-youtube" style="width:100%;padding-bottom:56.25%;height:0;position:relative"><iframe src="https://www.youtube.com/embed/${escapedVideoId}?loop=1&playlist=${escapedVideoId}${startQuery}" style="position:absolute;top:0;left:0;width:100%;height:100%" allowfullscreen loading="lazy"></iframe></div>`;
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
    const dominantColor = await getDominantColor(_image);
    const htmlFavicon = `<div class="blog-card__details__source__favicon" style="background-image: url(https://www.google.com/s2/favicons?domain=${escapeHtml(getDomainName(url))})"></div>`;
    const htmlSource = `<div class="blog-card__details__source__name">${source || getDomainName(url)}</div>`;
    const htmlImage = `<div class="blog-card__image" style="background-image: url(${_image});${dominantColor ? `background-color:${dominantColor.value}` : ''}"></div>`;
    const htmlDetails = `<div class="blog-card__details"><div class="blog-card__details__title">${title || url}</div><div class="blog-card__details__description">${description ?? ''}</div><div class="blog-card__details__source">${htmlFavicon}${htmlSource}</div></div>`;
    return `<div class="blog-card-wrapper"><a href="${canonical || url}" target="_blank" rel="noopener noreferrer" class="blog-card">${htmlImage}${htmlDetails}</a></div>`;
  }

  // TODO: Add test
  public static async parse(str: string): Promise<string> {
    if (!(str in Oembed.__cache)) {
      Oembed.__cache[str] = await Oembed.__parse(decode(str));
    }

    return Oembed.__cache[str];
  }
}
