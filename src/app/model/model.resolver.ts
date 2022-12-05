import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Model } from './repository.model';

@Injectable()
export class ModelResolver {
  constructor(private model: Model) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product | undefined> {
    return this.model.getProductObservable(1);
  }
}
