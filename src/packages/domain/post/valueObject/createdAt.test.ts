import CreatedAt from './createdAt';

describe('Date', () => {
  it('name が「作成日時」', () => {
    expect(CreatedAt.getName()).toBe('作成日時');
  });
});
