import type { ICodeService } from '$/domain/post/service/code';
import { singleton } from 'tsyringe';

@singleton()
export class CodeService implements ICodeService {
  public async process(html: string): Promise<string> {
    const { unified } = await import ('unified');
    const parse = (await import('rehype-parse')).default;
    const shiki = (await import('rehype-shiki')).default;
    const stringify = (await import('rehype-stringify')).default;
    return (await unified()
      .use(parse)
      .use(shiki)
      .use(stringify)
      .process(html)).toString();
  }
}
