import { ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * Custom Validator to test the IP Address by using a Regex Pattern
 */
export function IpPatternValidator(pattern: RegExp) : ValidatorFn {
    return(control: AbstractControl): {[input: string]: any} | null => {
        const isValid = pattern.test(control.value);
        return isValid ? null : {'ipPattern' : {value: control.value} };
    };
}