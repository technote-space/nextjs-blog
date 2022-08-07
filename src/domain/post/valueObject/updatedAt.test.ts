import UpdatedAt from './updatedAt';

describe('Date', () => {
  it('name が「更新日時」', () => {
    expect(UpdatedAt.getName()).toBe('更新日時');
  });
});
