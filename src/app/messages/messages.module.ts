import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message.service';
import { MessageErrorHandler } from './errorHandler';

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule],
  exports: [MessageComponent],
  providers: [
    MessageService,
    { provide: ErrorHandler, useClass: MessageErrorHandler },
  ],
})
export class MessagesModule {}
