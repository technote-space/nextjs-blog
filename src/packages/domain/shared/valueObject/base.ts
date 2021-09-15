// to avoid "Static members cannot reference class type parameters." error
export default function Base<Input, Output, Inner = Output>() {
  interface BaseStatic<T extends Base> {
    new(): T;
  }

  abstract class Base {
    protected _value!: Inner;

    // create メソッドの this コンテキストのせいで protected にはできない
    // protected constructor() {
    // }

    protected abstract fromInput(value: Input): Inner;

    protected toOutput(value: Inner): Output {
      return value as never;
    }

    public get value(): Output {
      return this.toOutput(this._value!);
    }

    public equals(value: this): boolean {
      return this.compare(value) === 0;
    }

    public abstract compare(value: this): number;

    public abstract getName(): string;

    public abstract validate(value: Input): string[] | undefined;

    public static create<T extends Base>(this: BaseStatic<T>, value: Input): T {
      const instance = new this();
      instance._value = instance.fromInput(value);

      return instance;
    }
  }

  return Base;
}

