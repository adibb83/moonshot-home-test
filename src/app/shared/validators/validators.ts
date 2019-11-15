import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export function greaterThan(field: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const group = control.parent;
        const fieldToCompare = group.get(field);
        const isLessThan = Number(fieldToCompare.value) * 10 <= Number(control.value);
        return isLessThan ? { lessThan: { value: control.value } } : null;
    };
}

export function multiplicationInputsValidator(firstKey: string, secondKey: string, multiplication: number ) {
    return (group: FormGroup): ValidationErrors | undefined => {
        if (Number(group.controls[firstKey].value) < Number(group.controls[secondKey].value) * multiplication) {
            return {
                // tslint:disable-next-line:object-literal-key-quotes
                'multiplicationMissmatch': true
            };
        }  else {
            return null;
        }
    };
}

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return (control.dirty && form.invalid) || (control.invalid && control.touched)  ;
    }
}

