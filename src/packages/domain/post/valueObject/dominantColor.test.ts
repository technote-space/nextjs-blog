import DominantColor from './dominantColor';

describe('DominantColor', () => {
  it('should create dominantColor', () => {
    const dominantColor = DominantColor.create('Test');
    expect(dominantColor.value).toBe('Test');
    expect(dominantColor.getName()).toBe('ドミナントカラー');
    expect(DominantColor.create(123).value).toBe('123');
  });

  it('should compare dominantColor', () => {
    const dominantColor1 = DominantColor.create('abc');
    const dominantColor2 = DominantColor.create('def');
    const dominantColor3 = DominantColor.create('def');
    expect(dominantColor1.compare(dominantColor2)).toBe(-1);
    expect(dominantColor2.compare(dominantColor1)).toBe(1);
    expect(dominantColor2.compare(dominantColor3)).toBe(0);
    expect(dominantColor1.equals(dominantColor2)).toBe(false);
    expect(dominantColor2.equals(dominantColor3)).toBe(true);
  });

  it('should validate', () => {
    expect(DominantColor.create('test').validate()).toEqual([]);
    expect(DominantColor.create('').validate()).toEqual(['値を指定してください']);
    expect(DominantColor.create('a'.repeat(33)).validate()).toEqual(['32文字より短く入力してください']);
  });
});
