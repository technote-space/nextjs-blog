import Source from '$/domain/post/valueObject/source';
import Id from './id';

describe('Id', () => {
  it('name が「記事ID」', () => {
    expect(Id.getName()).toBe('記事ID');
  });

  it('should create id', () => {
    const id = Id.create('source1-test1');
    expect(id.value).toBe('source1-test1');
    expect(Id.create({ source: Source.create('source2'), id: 'test2' }).value).toBe('source2-test2');
  });

  it('should compare id', () => {
    const id1 = Id.create('abc-a');
    const id2 = Id.create('def-a');
    const id3 = Id.create('def-a');
    expect(id1.compare(id2)).toBe(-1);
    expect(id2.compare(id1)).toBe(1);
    expect(id2.compare(id3)).toBe(0);
    expect(id1.equals(id2)).toBe(false);
    expect(id2.equals(id3)).toBe(true);
  });

  it('記事IDの形式が正しくないとエラー', () => {
    expect(Id.create('source-id').getErrors('id')).toBeUndefined();
    expect(Id.create('source-abc-def').getErrors('id')).toBeUndefined();
    expect(Id.create('').getErrors('id')).toEqual([{ name: 'id', error: '記事IDの形式が正しくありません' }]);
    expect(Id.create('source').getErrors('id')).toEqual([{ name: 'id', error: '記事IDの形式が正しくありません' }]);
  });
});
