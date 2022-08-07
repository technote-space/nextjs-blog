import type { IHtmlService } from '@/domain/post/service/html';
import { convert } from 'html-to-text';
import { singleton } from 'tsyringe';

@singleton()
export class HtmlService implements IHtmlService {
  public htmlToExcerpt(html: string): string {
    return convert(html, {
      wordwrap: null,
      selectors: [{ selector: 'pre', format: 'skip' }, { selector: 'code', format: 'skip' }, {
        selector: 'a',
        format: 'inline',
      }],
    }).replace(/\s{2,}/, ' ');
  }
}
