import { HtmlService } from '$/infra/post/service/html';

const htmlService = new HtmlService();
describe('htmlToExcerpt', () => {
  it('should convert html to excerpt string', () => {
    expect(htmlService.htmlToExcerpt('')).toBe('');
    expect(htmlService.htmlToExcerpt('<p>test1 <pre>this is code</pre>    test2\n<code>this is code</code>test3\n<a href="https://example.com">this is link</a>')).toBe('test1 test2 test3 this is link');
  });
});
