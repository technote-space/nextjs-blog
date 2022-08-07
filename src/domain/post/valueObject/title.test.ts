import Title from './title';

describe('Title', () => {
  it('name が「タイトル」', () => {
    expect(Title.getName()).toBe('タイトル');
  });

  it('長さが 255 より長いとエラー', () => {
    expect(Title.create('a'.repeat(255)).getErrors('title')).toEqual([]);
    expect(Title.create('a'.repeat(256)).getErrors('title')).toEqual([{ name: 'title', error: '255文字より短く入力してください' }]);
  });
});
