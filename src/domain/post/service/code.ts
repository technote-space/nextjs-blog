export interface ICodeService {
  process(html: string): Promise<string>;
}
