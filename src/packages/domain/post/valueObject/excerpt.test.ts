import Excerpt from './excerpt';

describe('Excerpt', () => {
  it('name が「抜粋」', () => {
    expect(Excerpt.getName()).toBe('抜粋');
  });

  it('should create excerpt', () => {
    const excerpt = Excerpt.create('Test');
    expect(excerpt.value).toBe('Test');
    expect(Excerpt.create(123).value).toBe('123');
    expect(Excerpt.create('123 https://example.com').value).toBe('123');
    expect(Excerpt.create(' https://example.com/test 123 ').value).toBe('123');
    expect(Excerpt.create(' 123  https://example.com/test?a=b&c=d#e   456 ').value).toBe('123 456');
    expect(Excerpt.create('a'.repeat(200)).value).toBe('a'.repeat(120) + '...');
  });
});
