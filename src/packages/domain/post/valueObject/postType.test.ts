import PostType from './postType';

describe('PostType', () => {
  it('should create postType', () => {
    const postType = PostType.create('test');
    expect(postType.value).toBe('test');
    expect(postType.getName()).toBe('投稿タイプ');
    expect(PostType.create(123).value).toBe('123');
  });

  it('should compare postType', () => {
    const postType1 = PostType.create('abc');
    const postType2 = PostType.create('def');
    const postType3 = PostType.create('def');
    expect(postType1.compare(postType2)).toBe(-1);
    expect(postType2.compare(postType1)).toBe(1);
    expect(postType2.compare(postType3)).toBe(0);
    expect(postType1.equals(postType2)).toBe(false);
    expect(postType2.equals(postType3)).toBe(true);
  });

  it('should validate', () => {
    expect(PostType.create('123').validate()).toBeUndefined();
    expect(PostType.create('').validate()).toEqual(['値を指定してください']);
  });

  it('should get pluralized', () => {
    expect(PostType.create('test').pluralized).toBe('tests');
  });
});
