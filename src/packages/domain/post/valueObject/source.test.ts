import Source from './source';

describe('Source', () => {
  it('should create source', () => {
    const source = Source.create('test');
    expect(source.value).toBe('test');
    expect(source.getName()).toBe('情報源');
    expect(Source.create(123).value).toBe('123');
  });

  it('should compare source', () => {
    const source1 = Source.create('abc');
    const source2 = Source.create('def');
    const source3 = Source.create('def');
    expect(source1.compare(source2)).toBe(-1);
    expect(source2.compare(source1)).toBe(1);
    expect(source2.compare(source3)).toBe(0);
    expect(source1.equals(source2)).toBe(false);
    expect(source2.equals(source3)).toBe(true);
  });

  it('should validate', () => {
    expect(Source.create('123').validate()).toBeUndefined();
    expect(Source.create('').validate()).toEqual(['値を指定してください']);
  });
});
