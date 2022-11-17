import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationFormatPipe } from '../validation-format.pipe';

/**
 * Es una directiva estructural
 */

@Directive({
  selector: '[validationsErrors]',
})
export class ValidationsErrorsDirective {
  @Input('validationsErrorsControl') name: string = '';
  @Input('validationsErrorsLabel') label?: string;
  @Input('validationsErrors') formGroup?: FormGroup;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<Object>
  ) {}

  ngOnInit() {
    let formatter = new ValidationFormatPipe();
    if (this.formGroup && this.name) {
      let control = this.formGroup?.get(this.name);
      if (control) {
        control.statusChanges.subscribe(() => {
          if (this.container.length > 0) {
            this.container.clear();
          }
          if (control && control.dirty && control.invalid && control.errors) {
            console.log(control.errors);
            formatter
              .formatMessages(control.errors, this.label ?? this.name)
              .forEach((err) => {
                this.container.createEmbeddedView(this.template, {
                  $implicit: err,
                });
              });
          }
        });
      }
    }
  }
}
