import Name from './name';

describe('Name', () => {
  it('name が「名前」', () => {
    expect(Name.getName()).toBe('名前');
  });

  it('長さが 32 より長いとエラー', () => {
    expect(Name.create('a'.repeat(32)).getErrors('name')).toEqual([]);
    expect(Name.create('a'.repeat(33)).getErrors('name')).toEqual([{ name: 'name', error: '32文字より短く入力してください' }]);
  });
});
