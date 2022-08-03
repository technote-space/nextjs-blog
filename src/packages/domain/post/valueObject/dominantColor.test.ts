import DominantColor from './dominantColor';

describe('DominantColor', () => {
  it('name が「ドミナントカラー」', () => {
    expect(DominantColor.getName()).toBe('ドミナントカラー');
  });

  it('長さが 32 より長いとエラー', () => {
    expect(DominantColor.create('a'.repeat(32)).getErrors('dominantColor')).toEqual([]);
    expect(DominantColor.create('a'.repeat(33)).getErrors('dominantColor')).toEqual([{
      name: 'dominantColor',
      error: '32文字より短く入力してください',
    }]);
  });
});
