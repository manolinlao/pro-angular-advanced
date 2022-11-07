import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
import { SharedState } from './sharedState.service';
import { ModelModule } from '../model/model.module';



@NgModule({
  declarations: [
    TableComponent,
    FormComponent
  ],
  imports: [
    CommonModule,FormsModule,ModelModule
  ],
  exports:[TableComponent,FormComponent],
  providers:[SharedState]
})
export class CoreModule { }
