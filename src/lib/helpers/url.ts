// License MIT @zenn-dev/zenn-editor
// @see https://github.com/zenn-dev/zenn-editor
// @see https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-markdown-html/src/utils/url-matcher.ts

import { pregQuote } from '@/lib/helpers/string';

export const isTweetUrl = (url: string): boolean => /^https:\/\/twitter\.com\/[a-zA-Z0-9_-]+\/status\/[a-zA-Z0-9?=]+$/.test(url);

export const isStackblitzUrl = (url: string): boolean => /^https:\/\/stackblitz\.com\/[a-zA-Z0-9\-_/.@?&=%]+$/.test(url);

export const isCodesandboxUrl = (url: string): boolean => /^https:\/\/codesandbox\.io\/embed\/[a-zA-Z0-9\-_/.@?&=%]+$/.test(url);

export const isCodepenUrl = (url: string): boolean => /^https:\/\/codepen\.io\/[a-zA-Z0-9]/.test(url);

export const isJsfiddleUrl = (url: string): boolean => /^(http|https):\/\/jsfiddle\.net\/[a-zA-Z0-9_,/-]+$/.test(url);

const youtubeRegexp = /^(http(s?):\/\/)?(www\.)?youtu(be)?\.([a-z])+\/(watch(.*?)([?&])v=)?(.*?)(&(.)*)?$/;

export function extractYoutubeVideoParameters(
  youtubeUrl: string,
): { videoId: string; start?: string } | undefined {
  const match = youtubeUrl.match(youtubeRegexp);
  if (match && match[9].length == 11) {
    const urlParams = new URLSearchParams(youtubeUrl);
    const start = urlParams.get('t');
    return {
      videoId: match[9],
      start: start?.replace('s', ''), // https://www.youtube.com/watch?v=ABCSDGG&t=19101s => 19101
    };
  } else {
    return undefined;
  }
}

export const isYoutubeUrl = (url: string): boolean => youtubeRegexp.test(url);

export function isValidHttpUrl(str: string) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

const extractOneLineLinks1 = (text: string): RegExpMatchArray[] => Array.from(text.matchAll(/^(<p>)?(<a[^>]+?>)?(https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:@&=+$,%#]+)(<\/a>)?(?!.*<br\s*\/?>).*?(<\/p>)?/img));
const extractOneLineLinks2 = (text: string): RegExpMatchArray[] => Array.from(text.matchAll(/<br\s*\/?>((<a[^>]+?>)?(https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:@&=+$,%#]+)(<\/a>)?)(<br\s*\/?>|<\/p>)/img));
const processOneLineLink = (replace: (url: string) => Promise<string>) => async (prev: Promise<string>, match: RegExpMatchArray) => {
  const acc = await prev;
  if (match[0].startsWith('<br')) {
    return acc.replace(new RegExp(`${pregQuote(match[1], '/')}`, 'img'), await replace(match[3]));
  }

  if (match[0].includes('p>') && (!match[0].includes('<p>') || !match[0].includes('</p>'))) {
    return acc;
  }

  return acc.replace(new RegExp(`^${pregQuote(match[0], '/')}`, 'img'), await replace(match[3]));
};
const processOneLineLinks = (
  text: string,
  extractor: (text: string) => RegExpMatchArray[],
  replace: (url: string) => Promise<string>,
): Promise<string> => extractor(text).reduce(processOneLineLink(replace), Promise.resolve(text));
const extractExternalLinks = (text: string): RegExpMatchArray[] => Array.from(text.matchAll(/<a([^>]*?)href="(https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:@&=+$,%#]+)"(.*?)>([^<].+?)<\/a>/img));
const processExternalLink = async (prev: Promise<string>, match: RegExpMatchArray) => {
  const acc = await prev;
  const includesTarget = match[1].includes('target=') || match[3].includes('target=');
  const includesNoReferrer = match[1].includes('noreferrer') || match[3].includes('noreferrer');
  const includesNoOpener = match[1].includes('noopener') || match[3].includes('noopener');
  if (includesTarget && includesNoReferrer && includesNoOpener) {
    return acc;
  }

  const target = includesTarget ? '' : ' target="_blank"';
  const rel = !includesNoReferrer || !includesNoOpener ? ` rel="${[includesNoReferrer ? '' : 'noreferrer', includesNoOpener ? '' : 'noopener'].join(' ')}"` : '';
  return acc.replace(new RegExp(`${pregQuote(match[0], '/')}`, 'img'), `<a href="${match[2]}"${target}${rel}${match[1]}${match[3]}>${match[4]}</a>`);
};
const processExternalLinks = (
  text: string,
  extractor: (text: string) => RegExpMatchArray[],
): Promise<string> => extractor(text).reduce(processExternalLink, Promise.resolve(text));

export const replaceLinks = async (text: string, replace: (url: string) => Promise<string>): Promise<string> => {
  return processExternalLinks(
    await processOneLineLinks(
      await processOneLineLinks(
        text,
        extractOneLineLinks1,
        replace,
      ),
      extractOneLineLinks2,
      replace,
    ),
    extractExternalLinks,
  );
};

export const getDomainName = (url: string): string => {
  return new URL(url).hostname;
};
