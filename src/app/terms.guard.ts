import { Injectable } from '@angular/core';
import { MessageService } from './messages/message.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Message } from './messages/message.model';

@Injectable()
export class TermsGuard {
  constructor(private messages: MessageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    if (route.params['mode'] == 'create') {
      const myPromise = new Promise<boolean>((resolve) => {
        let responses: [string, () => void][] = [
          ['Yes', () => resolve(true)],
          ['No', () => resolve(false)],
        ];
        this.messages.reportMessage(
          new Message(
            'do you accept the terms and conditions?',
            false,
            responses
          )
        );
      });
      return myPromise;
    } else {
      return true;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    if (
      route.url.length > 0 &&
      route.url[route.url.length - 1].path == 'categories'
    ) {
      return new Promise<boolean>((resolve, reject) => {
        let responses: [string, (arg: string) => void][] = [
          ['Yes', () => resolve(true)],
          ['No', () => resolve(false)],
        ];
        this.messages.reportMessage(
          new Message(
            'do you want to see the categories component?',
            false,
            responses
          )
        );
      });
    } else {
      return true;
    }
  }
}
