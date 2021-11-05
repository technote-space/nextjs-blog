import Excerpt from './excerpt';

describe('Excerpt', () => {
  it('should create excerpt', () => {
    const excerpt = Excerpt.create('Test');
    expect(excerpt.value).toBe('Test');
    expect(excerpt.getName()).toBe('抜粋');
    expect(Excerpt.create(123).value).toBe('123');
    expect(Excerpt.create('123 https://example.com').value).toBe('123');
    expect(Excerpt.create(' https://example.com/test 123 ').value).toBe('123');
    expect(Excerpt.create(' 123  https://example.com/test?a=b&c=d#e   456 ').value).toBe('123 456');
    expect(Excerpt.create('a'.repeat(200)).value).toBe('a'.repeat(120) + '...');
  });

  it('should compare excerpt', () => {
    const excerpt1 = Excerpt.create('abc');
    const excerpt2 = Excerpt.create('def');
    const excerpt3 = Excerpt.create('def');
    expect(excerpt1.compare(excerpt2)).toBe(-1);
    expect(excerpt2.compare(excerpt1)).toBe(1);
    expect(excerpt2.compare(excerpt3)).toBe(0);
    expect(excerpt1.equals(excerpt2)).toBe(false);
    expect(excerpt2.equals(excerpt3)).toBe(true);
  });

  it('should validate', () => {
    expect(Excerpt.create('test').validate()).toEqual([]);
    expect(Excerpt.create('').validate()).toEqual(['値を指定してください']);
  });
});
