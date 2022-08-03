import PostType from './postType';

describe('PostType', () => {
  it('name が「投稿タイプ」', () => {
    expect(PostType.getName()).toBe('投稿タイプ');
  });

  it('should get pluralized', () => {
    expect(PostType.create('test').pluralized).toBe('tests');
  });
});
