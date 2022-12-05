import { NgModule } from '@angular/core';
import { Model } from './repository.model';
import { HttpClientModule } from '@angular/common/http';
import { RestDataSource, REST_URL } from './rest.datasource';
import { ModelResolver } from './model.resolver';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    Model,
    RestDataSource,
    {
      provide: REST_URL,
      useValue: `http://${location.hostname}:3500/products`,
    },
    ModelResolver,
  ],
})
export class ModelModule {}
