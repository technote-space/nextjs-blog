import { replaceAll, pregQuote, escapeHtml, decodeUrlHtmlEntity } from './string';

describe('replaceAll', () => {
  it('should replace all string', () => {
    expect(replaceAll('', '', '')).toBe('');
    expect(replaceAll('test1test2', 'test', 'abc')).toBe('abc1abc2');
    expect(replaceAll('test1test2', /^test/, 'abc')).toBe('abc1test2');
  });
});

describe('pregQuote', () => {
  it('should sanitize', () => {
    expect(pregQuote('')).toBe('');
    expect(pregQuote('^$test1/test2', '/')).toBe('\\^\\$test1\\/test2');
    expect(pregQuote('^$test1/test2', '#')).toBe('\\^\\$test1/test2');
  });
});

describe('escapeHtml', () => {
  it('should escape html', () => {
    expect(escapeHtml('')).toBe('');
    expect(escapeHtml('test1&test2<test3')).toBe('test1&amp;test2&lt;test3');
  });
});

describe('decodeUrlHtmlEntity', () => {
  it('should decode url html entity', () => {
    expect(decodeUrlHtmlEntity('')).toBe('');
    expect(decodeUrlHtmlEntity('test1&#38;test2&#x3d;test3&#63;&#x3f;')).toBe('test1&test2=test3??');
  });
});
