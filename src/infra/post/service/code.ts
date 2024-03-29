import type { ICodeService } from '@/domain/post/service/code';
import { readdirSync } from 'fs';
import parse from 'rehype-parse';
import shiki from 'rehype-shiki';
import stringify from 'rehype-stringify';
import { singleton } from 'tsyringe';
import { unified } from 'unified';

// FIXME: 1度読まないと Vercel で消える
const path = process.cwd();
readdirSync(`${path}/node_modules/shiki-languages`);
readdirSync(`${path}/node_modules/vscode-textmate`);

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
