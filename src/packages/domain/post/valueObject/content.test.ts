import Content from './content';

describe('Content', () => {
  it('should create content', () => {
    const content = Content.create('Test');
    expect(content.value).toBe('Test');
    expect(content.getName()).toBe('内容');
    expect(Content.create(123).value).toBe('123');
  });

  it('should compare content', () => {
    const content1 = Content.create('abc');
    const content2 = Content.create('def');
    const content3 = Content.create('def');
    expect(content1.compare(content2)).toBe(-1);
    expect(content2.compare(content1)).toBe(1);
    expect(content2.compare(content3)).toBe(0);
    expect(content1.equals(content2)).toBe(false);
    expect(content2.equals(content3)).toBe(true);
  });

  it('should validate', () => {
    expect(Content.create('test').validate()).toEqual([]);
    expect(Content.create('').validate()).toEqual(['値を指定してください']);
    expect(Content.create('a'.repeat(100001)).validate()).toEqual(['100000文字より短く入力してください']);
  });
});
