import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationFormat',
})
export class ValidationFormatPipe implements PipeTransform {
  transform(source: any, name: any): string[] {
    if (source instanceof FormControl) {
      return this.formatMessages((source as FormControl).errors, name);
    }
    return this.formatMessages(source as ValidationErrors, name);
  }

  formatMessages(errors: ValidationErrors | null, name: string): string[] {
    let messages: string[] = [];
    for (let errorName in errors) {
      switch (errorName) {
        case 'required':
          messages.push(`you must enter a ${name}`);
          break;
        case 'minlength':
          messages.push(
            `a ${name} must be at least ${errors['minlength'].requiredLength} characters`
          );
          break;
        case 'pattern':
          messages.push(`the name ${name} contains illegal characters`);
          break;
        case 'limit':
          messages.push(
            `the ${name} must be less than ${errors['limit'].limit}`
          );
          break;
      }
    }
    return messages;
  }
}
