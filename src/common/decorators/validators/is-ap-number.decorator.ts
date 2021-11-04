import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsApNumber(validationOptions?: ValidationOptions) {
    return function (object: Record<any, any>, propertyName: string) {
        registerDecorator({
            name: 'isApNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: number): boolean {
                    if (!value) return false;
                    if (value > 9900) return false;
                    if (value < 0) return false;
                    return true;
                },
            },
        });
    };
}
