import Thumbnail from './thumbnail';

describe('Thumbnail', () => {
  it('name が「記事ID」', () => {
    expect(Thumbnail.getName()).toBe('サムネイル');
  });
});
