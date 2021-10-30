import Url from './url';

class TestUrl extends Url {
  public getName(): string {
    return 'test';
  }
}

describe('Url', () => {
  it('should create url', () => {
    expect(TestUrl.create('https://example.com').value).toBe('https://example.com');
    expect(TestUrl.create('https://example.com/aaa/bbb?ccc=ddd&eee=fff#ggg').value).toBe('https://example.com/aaa/bbb?ccc=ddd&eee=fff#ggg');
  });

  it('should compare url', () => {
    const url1 = TestUrl.create('https://example.com/abc');
    const url2 = TestUrl.create('https://example.com/def');
    const url3 = TestUrl.create('https://example.com/def');
    expect(url1.compare(url2)).toBe(-1);
    expect(url2.compare(url1)).toBe(1);
    expect(url2.compare(url3)).toBe(0);
    expect(url1.equals(url2)).toBe(false);
    expect(url2.equals(url3)).toBe(true);
  });

  it('should validate', () => {
    expect(TestUrl.create('https://example.com').validate()).toBeUndefined();
    expect(TestUrl.create('abc').validate()).toEqual(['URLの形式が正しくありません']);
  });
});
