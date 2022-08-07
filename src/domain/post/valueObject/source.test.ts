import Source from './source';

describe('Source', () => {
  it('name が「情報源」', () => {
    expect(Source.getName()).toBe('情報源');
  });
});
