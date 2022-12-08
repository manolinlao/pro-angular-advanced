import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Model } from './repository.model';
import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.model';

@Injectable()
export class ModelResolver {
  constructor(private model: Model, private message: MessageService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product | undefined> {
    this.message.reportMessage(new Message('Loading data...'));
    return this.model.getProductObservable(1);
  }
}
