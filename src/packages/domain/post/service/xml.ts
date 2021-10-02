export interface IXmlService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parse<T>(xmlContent: string): Promise<T>;
}
