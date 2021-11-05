import Slug from './slug';

describe('Slug', () => {
  it('should create slug', () => {
    const slug = Slug.create('test');
    expect(slug.value).toBe('test');
    expect(slug.getName()).toBe('Slug');
    expect(Slug.create(123).value).toBe('123');
  });

  it('should compare slug', () => {
    const slug1 = Slug.create('abc');
    const slug2 = Slug.create('def');
    const slug3 = Slug.create('def');
    expect(slug1.compare(slug2)).toBe(-1);
    expect(slug2.compare(slug1)).toBe(1);
    expect(slug2.compare(slug3)).toBe(0);
    expect(slug1.equals(slug2)).toBe(false);
    expect(slug2.equals(slug3)).toBe(true);
  });

  it('should validate', () => {
    expect(Slug.create('123').validate()).toBeUndefined();
    expect(Slug.create('').validate()).toEqual(['値を指定してください']);
  });
});
