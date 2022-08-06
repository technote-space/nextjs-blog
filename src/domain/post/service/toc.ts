import type { HeadingTagName } from '@jsdevtools/rehype-toc';

export interface ITocService {
  process(html: string, headings?: HeadingTagName[]): Promise<string>;
}
