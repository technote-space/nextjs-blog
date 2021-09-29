export interface IOembedService {
  process(str: string): Promise<string>;
}
