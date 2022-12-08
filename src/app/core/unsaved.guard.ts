import { Injectable } from '@angular/core';
import { MessageService } from '../messages/message.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { Observable, Subject } from 'rxjs';
import { Message } from '../messages/message.model';

@Injectable()
export class UnsavedGuard {
  constructor(private messages: MessageService, private router: Router) {}

  canDeactivate(
    component: FormComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (component.editing && component.unsavedChanges()) {
      let subject = new Subject<boolean>();

      let responses: [string, (r: string) => void][] = [
        [
          'Yes',
          () => {
            subject.next(true);
            subject.complete();
          },
        ],
        [
          'No',
          () => {
            subject.next(false);
            subject.complete();
          },
        ],
      ];
      this.messages.reportMessage(
        new Message('Discard changes?', true, responses)
      );
      return subject;
    }
    return true;
  }
}
