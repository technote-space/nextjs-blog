import type { ICodeService } from '$/domain/post/service/code';
import parse from 'rehype-parse';
import shiki from 'rehype-shiki';
import stringify from 'rehype-stringify';
import { singleton } from 'tsyringe';
import { unified } from 'unified';

@singleton()
export class CodeService implements ICodeService {
  public async process(html: string): Promise<string> {
    return (await unified()
      .use(parse)
      .use(shiki)
      .use(stringify)
      .process(html)).toString();
  }
}
