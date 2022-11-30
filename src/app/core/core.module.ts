import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { ValidationFormatPipe } from './validation-format.pipe';
import { ValidationsErrorsDirective } from './directives/validations-errors.directive';
import { RouterModule } from '@angular/router';
import { ProductCountComponent } from './components/product-count/product-count.component';
import { CategoryCountComponent } from './components/category-count/category-count.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    TableComponent,
    FormComponent,
    ValidationFormatPipe,
    ValidationsErrorsDirective,
    ProductCountComponent,
    CategoryCountComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModelModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [TableComponent, FormComponent],
})
export class CoreModule {}
