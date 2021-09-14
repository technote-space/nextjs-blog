import ValidationException from '$/domain/shared/exceptions/validation';

// to avoid "Static members cannot reference class type parameters." error
export default function Base<Input, Output, Inner = Output>() {
  interface BaseStatic<T extends Base> {
    new(): T;
  }

  abstract class Base {
    private value?: Inner;

    protected constructor() {
    }

    protected abstract process(value: Input): Inner;

    protected abstract getName(): string;

    protected abstract validate(value: Input): string[] | undefined;

    public static create<T extends Base>(this: BaseStatic<T>, value: Input): Base {
      const instance = new this();
      const errors = instance.validate(value);
      if (errors?.length) {
        throw new ValidationException(instance.getName(), errors);
      }
      instance.value = instance.process(value);

      return instance;
    }

    public static reconstruct<T extends Base>(this: BaseStatic<T>, value: Input): Base {
      const instance = new this();
      instance.value = instance.process(value);

      return instance;
    }
  }

  return Base;
}

