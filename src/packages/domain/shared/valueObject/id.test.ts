import Id from './id';

class TestId extends Id {
  public getName(): string {
    return 'test';
  }
}

describe('Int', () => {
  it('should validate', () => {
    expect(TestId.create('123').validate()).toBeUndefined();
    expect(TestId.create('abc').validate()).toEqual(['数値の形式が正しくありません']);
    expect(TestId.create('123.45').validate()).toEqual(['整数の形式が正しくありません']);
    expect(TestId.create('10000000000000000').validate()).toEqual(['有効な整数ではありません']);
    expect(TestId.create('-1').validate()).toEqual(['１以上を指定してください']);
  });
});
