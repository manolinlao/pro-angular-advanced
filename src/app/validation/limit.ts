import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class LimitValidator {
  static Limit(limit: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let val = parseFloat(control.value);
      if (isNaN(val) || val > limit) {
        console.log('VAL > limit-' + limit, val);
        return { limit: { limit: limit, actualValue: val } };
      }
      return null;
    };
  }
}
