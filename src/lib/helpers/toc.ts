import type { HeadingTagName, HtmlElementNode } from '@jsdevtools/rehype-toc';
import type { Literal } from 'unist';
import { toc } from '@jsdevtools/rehype-toc';
import parse from 'rehype-parse';
import slug from 'rehype-slug';
import stringify from 'rehype-stringify';
import { unified } from 'unified';
import { getRandomString } from '@/lib/helpers/random';

const customizeTOC = (toc: HtmlElementNode): HtmlElementNode => {
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
    .use(toc, {
      headings: _headings,
      customizeTOC: customizeTOC,
    })
    .use(stringify)
    .process(html)).toString();
};
