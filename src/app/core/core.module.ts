import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';



@NgModule({
  declarations: [
    TableComponent,
    FormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
