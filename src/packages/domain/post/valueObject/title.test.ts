import Title from './title';

describe('Title', () => {
  it('should create title', () => {
    const title = Title.create('Test');
    expect(title.value).toBe('Test');
    expect(title.getName()).toBe('タイトル');
    expect(Title.create(123).value).toBe('123');
  });

  it('should compare title', () => {
    const title1 = Title.create('abc');
    const title2 = Title.create('def');
    const title3 = Title.create('def');
    expect(title1.compare(title2)).toBe(-1);
    expect(title2.compare(title1)).toBe(1);
    expect(title2.compare(title3)).toBe(0);
    expect(title1.equals(title2)).toBe(false);
    expect(title2.equals(title3)).toBe(true);
  });

  it('should validate', () => {
    expect(Title.create('test').validate()).toEqual([]);
    expect(Title.create('').validate()).toEqual(['値を指定してください']);
    expect(Title.create('a'.repeat(256)).validate()).toEqual(['255文字より短く入力してください']);
  });
});
