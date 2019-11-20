import { ValidationErrors, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


export function multiplicationInputsValidator(firstKey: string, secondKey: string, multiplication: number) {
    return (group: FormGroup): ValidationErrors | undefined => {
        if (Number(group.controls[firstKey].value) < Number(group.controls[secondKey].value) * multiplication) {
            return {
                // tslint:disable-next-line:object-literal-key-quotes
                'multiplicationMissmatch': true
            };
        } else {
            return null;
        }
    };
}

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return (control.dirty && form.invalid) || (control.invalid && control.touched);
    }
}

export function validateRequired(c: FormControl) {
    if (c.value.length === 0) {
        return { required: true };
    } else {
        return null;
    }
}

