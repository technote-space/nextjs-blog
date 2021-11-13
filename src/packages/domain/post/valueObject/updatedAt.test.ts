import UpdatedAt from './updatedAt';

describe('Date', () => {
  it('should create date', () => {
    const date = UpdatedAt.create('2020-10-20');
    expect(date.value.year()).toBe(2020);
    expect(date.value.month()).toBe(9);
    expect(date.value.date()).toBe(20);
    expect(date.getName()).toBe('更新日時');
  });

  it('should compare date', () => {
    const date1 = UpdatedAt.create('2020-10-20');
    const date2 = UpdatedAt.create('2021-10-20');
    const date3 = UpdatedAt.create('2021-10-20');
    expect(date1.compare(date2)).toBe(-1);
    expect(date2.compare(date1)).toBe(1);
    expect(date2.compare(date3)).toBe(0);
    expect(date1.equals(date2)).toBe(false);
    expect(date2.equals(date3)).toBe(true);
  });

  it('should validate', () => {
    expect(UpdatedAt.create('2020-10-20').validate()).toBeUndefined();
    expect(UpdatedAt.create(undefined).validate()).toBeUndefined();
    expect(UpdatedAt.create('abc').validate()).toEqual(['日付の形式が正しくありません']);
  });
});
