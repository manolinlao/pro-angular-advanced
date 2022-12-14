import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OndemandComponent } from './ondemand.component';
import { RouterModule } from '@angular/router';
import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';

let routing = RouterModule.forChild([
  {
    path: '',
    component: OndemandComponent,
    children: [
      {
        path: 'swap',
        children: [
          { outlet: 'primary', path: '', component: FirstComponent },
          { outlet: 'left', path: '', component: SecondComponent },
          { outlet: 'right', path: '', component: SecondComponent },
        ],
      },
    ],
  },
]);

@NgModule({
  declarations: [OndemandComponent, FirstComponent, SecondComponent],
  imports: [CommonModule, routing],
  exports: [OndemandComponent],
})
export class OndemandModule {}
