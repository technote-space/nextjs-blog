import Name from './name';

describe('Name', () => {
  it('should create name', () => {
    const name = Name.create('Test');
    expect(name.value).toBe('Test');
    expect(name.getName()).toBe('名前');
    expect(Name.create(123).value).toBe('123');
  });

  it('should compare name', () => {
    const name1 = Name.create('abc');
    const name2 = Name.create('def');
    const name3 = Name.create('def');
    expect(name1.compare(name2)).toBe(-1);
    expect(name2.compare(name1)).toBe(1);
    expect(name2.compare(name3)).toBe(0);
    expect(name1.equals(name2)).toBe(false);
    expect(name2.equals(name3)).toBe(true);
  });

  it('should validate', () => {
    expect(Name.create('test').validate()).toEqual([]);
    expect(Name.create('').validate()).toEqual(['値を指定してください']);
    expect(Name.create('a'.repeat(33)).validate()).toEqual(['32文字より短く入力してください']);
  });
});
