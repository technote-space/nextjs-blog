import Thumbnail from './thumbnail';

describe('Thumbnail', () => {
  it('should create thumbnail', () => {
    expect(Thumbnail.create('https://example.com').value).toBe('https://example.com');
    expect(Thumbnail.create('https://example.com/aaa/bbb?ccc=ddd&eee=fff#ggg').value).toBe('https://example.com/aaa/bbb?ccc=ddd&eee=fff#ggg');
  });

  it('should compare thumbnail', () => {
    const thumbnail1 = Thumbnail.create('https://example.com/abc');
    const thumbnail2 = Thumbnail.create('https://example.com/def');
    const thumbnail3 = Thumbnail.create('https://example.com/def');
    expect(thumbnail1.compare(thumbnail2)).toBe(-1);
    expect(thumbnail2.compare(thumbnail1)).toBe(1);
    expect(thumbnail2.compare(thumbnail3)).toBe(0);
    expect(thumbnail1.equals(thumbnail2)).toBe(false);
    expect(thumbnail2.equals(thumbnail3)).toBe(true);
  });

  it('should validate', () => {
    expect(Thumbnail.create('https://example.com').validate()).toBeUndefined();
    expect(Thumbnail.create('abc').validate()).toEqual(['URLの形式が正しくありません']);
  });
});
