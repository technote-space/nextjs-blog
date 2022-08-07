export interface IOembedService {
  process(str: string, referrer: string): Promise<string>;
}
