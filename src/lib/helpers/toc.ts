import type { HeadingTagName, HtmlElementNode } from '@jsdevtools/rehype-toc';
import type { Literal } from 'unist';
import { toc } from '@jsdevtools/rehype-toc';
import parse from 'rehype-parse';
import slug from 'rehype-slug';
import autolink from 'rehype-autolink-headings';
import stringify from 'rehype-stringify';
import { unified } from 'unified';
import { getRandomString } from '@/lib/helpers/random';

const customizeTOC = (toc: HtmlElementNode): HtmlElementNode => {
  if (((toc.children![0] as HtmlElementNode).children?.length ?? 0) <= 1) {
    return {
      type: 'element',
      tagName: 'span',
      properties: {},
    };
  }
  const id = `toc-checkbox-${getRandomString()}`;
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: 'toc-wrapper' },
    children: [
      {
        type: 'element',
        tagName: 'input',
        properties: { type: 'checkbox', className: 'toc-checkbox', id, checked: 'checked' },
      } as HtmlElementNode,
      {
        type: 'element',
        tagName: 'label',
        properties: { className: 'toc-title', for: id },
        children: [
          { type: 'text', value: '目次' } as Literal,
        ],
      } as HtmlElementNode,
      toc,
    ],
  };
};

// TODO: Add test
export const addToc = async (html: string, headings?: HeadingTagName[]): Promise<string> => {
  const _headings = headings ?? ['h1', 'h2', 'h3', 'h4'];
  if (!_headings.length) {
    return html;
  }

  return (await unified()
    .use(parse)
    .use(slug)
    .use(autolink, {
      behavior: 'append',
      content: {
        type: 'element',
        tagName: 'svg',
        properties: {
          className: ['icon', 'icon-link'],
          role: 'img',
          xmlns: 'http://www.w3.org/2000/svg',
          width: '20px',
          height: '20px',
          viewBox: '0 0 24 24',
          'aria-labelledby': 'paperclipIconTitle',
          stroke: '#2329EE',
          'stroke-width': '1',
          'stroke-linecap': 'square',
          'stroke-linejoin': 'miter',
          fill: 'none',
          color: '#131996',
        },
        children: [
          {
            type: 'element',
            tagName: 'path',
            properties: { d: 'M7.93517339,13.7795989 L15.1617306,6.55304173 C16.03921,5.67631227 17.4656766,5.67631227 18.343156,6.55304173 C19.2206355,7.43052116 19.2206355,8.85773771 18.343156,9.73521714 L8.40091248,19.5477137 C6.93619681,21.0124294 4.56325242,21.0124294 3.09853675,19.5477137 C1.63382108,18.083748 1.63382108,15.7093037 3.09853675,14.245338 L12.9335328,4.53783896 C14.9839848,2.48738701 18.3094068,2.48738701 20.3568588,4.53783896 C22.4088107,6.58904088 22.4088107,9.91146301 20.3583588,11.961915 L13.2390491,19.0819746' },
            children: [],
          },
        ],
      },
    })
    .use(toc, {
      headings: _headings,
      customizeTOC: customizeTOC,
    })
    .use(stringify)
    .process(html)).toString();
};
