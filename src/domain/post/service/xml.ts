export interface IXmlService {
  parse<T>(xmlContent: string): Promise<T>;
}
