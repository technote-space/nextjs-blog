import type ValidationException from '$/domain/shared/exceptions/validation';
import Id from '$/domain/shared/valueObject/id';
import Base from './base';

class TestId extends Id {
  getName(): string {
    return 'test';
  }
}

class TestBase extends Base {
  private id1?: Id;
  private id2?: Id;
  private id3!: Id;
  private id4!: Id;

  public static reconstruct(id1: Id, id2: Id, id3: Id, id4: Id): TestBase {
    const instance = new this();
    instance.id1 = id1;
    instance.id2 = id2;
    instance.id3 = id3;
    instance.id4 = id4;

    return instance;
  }

  public static create(id3: Id, id4: Id): TestBase {
    const instance = new this();
    instance.id3 = id3;
    instance.id4 = id4;

    return instance;
  }
}

describe('Entity Base', () => {
  it('should not throw error', () => {
    let error: ValidationException | undefined = undefined;
    try {
      TestBase.create(TestId.create(1), TestId.create('1')).validate();
    } catch (e) {
      error = e as ValidationException;
    }

    expect(error).toBeUndefined();
  });

  it('should throw error 1', () => {
    let error: ValidationException | undefined = undefined;
    try {
      TestBase.create(TestId.create(1), TestId.create(0)).validate();
    } catch (e) {
      error = e as ValidationException;
    }

    expect(error).not.toBeUndefined();
    expect(error?.message).toBe('バリデーションエラーが発生しました');
    expect(error?.errors).toEqual({
      id4: {
        errors: ['１以上を指定してください'],
        name: 'test',
      },
    });
  });

  it('should throw error 2', () => {
    let error: ValidationException | undefined = undefined;
    try {
      TestBase.reconstruct(TestId.create(1), TestId.create(0), TestId.create(1), TestId.create('abc')).validate();
    } catch (e) {
      error = e as ValidationException;
    }

    expect(error).not.toBeUndefined();
    expect(error?.message).toBe('バリデーションエラーが発生しました');
    expect(error?.errors).toEqual({
      id2: {
        errors: ['１以上を指定してください'],
        name: 'test',
      },
      id4: {
        errors: ['数値の形式が正しくありません'],
        name: 'test',
      },
    });
  });
});
