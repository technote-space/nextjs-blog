import type { IXmlService } from '@/domain/post/service/xml';
import { singleton } from 'tsyringe';
import xml2js from 'xml2js';

@singleton()
export class XmlService implements IXmlService {
  public async parse<T>(xmlContent: string): Promise<T> {
    return xml2js.parseStringPromise(xmlContent, {
      trim: true,
      tagNameProcessors: [xml2js.processors.stripPrefix],
    });
  }
}
