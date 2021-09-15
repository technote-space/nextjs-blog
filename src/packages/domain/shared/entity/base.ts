import type { ValidationErrors } from '$/domain/shared/exceptions/validation';
import InvalidValueException from '$/domain/shared/exceptions/invalidValue';
import ValidationException from '$/domain/shared/exceptions/validation';

// to avoid "Static members cannot reference class type parameters." error
export default function Base() {
  abstract class Base {
    protected constructor() {
    }

    public validate(): void | never {
      const errors = Object.assign({}, ...Object.keys(this).map(key => {
        const member = this[key as keyof this] as any;
        if (member && 'validate' in member && 'getName' in member) {
          const errors: string[] | undefined = member.validate();
          if (errors?.length) {
            const name: string = member.getName();
            return { [key]: { name, errors } };
          }
        }

        return undefined;
      }).filter((error): error is ValidationErrors => !!error));

      if (Object.keys(errors).length) {
        throw new ValidationException(errors);
      }
    }

    protected checkNotEmpty<T extends Base>(property: string): void | never {
      const keys = Object.keys(this);
      if (!keys.includes(property)) {
        throw InvalidValueException;
      }
    }
  }

  return Base;
};
