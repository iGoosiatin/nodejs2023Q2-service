import { ValidationOptions, ValidateIf } from 'class-validator';

export default function IsNullable(
  options?: ValidationOptions,
): PropertyDecorator {
  return function IsNullableDecorator(
    prototype: object,
    propertyKey: string | symbol,
  ) {
    ValidateIf((obj) => obj[propertyKey] !== null, options)(
      prototype,
      propertyKey,
    );
  };
}
