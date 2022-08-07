import Content from './content';

describe('Content', () => {
  it('name が「内容」', () => {
    expect(Content.getName()).toBe('内容');
  });

  it('長さが 100000 より長いとエラー', () => {
    expect(Content.create('a'.repeat(100000)).getErrors('content')).toEqual([]);
    expect(Content.create('a'.repeat(100001)).getErrors('content')).toEqual([{
      name: 'content',
      error: '100000文字より短く入力してください',
    }]);
  });
});
