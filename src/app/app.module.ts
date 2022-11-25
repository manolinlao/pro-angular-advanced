import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MessagesModule } from './messages/messages.module';
import { CoreModule } from './core/core.module';
import { routing } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MessagesModule, CoreModule, routing],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
