import { Injectable } from '@angular/core';
import { MessageService } from './messages/message.service';
import { Router, Route } from '@angular/router';
import { Message } from './messages/message.model';

@Injectable()
export class LoadGuard {
  private loaded: boolean = false;

  constructor(private messages: MessageService, private router: Router) {}

  canLoad(route:Route):Promise<boolean> | boolean{
    return this.loaded || new Promise<boolean>((resolve,reject)=>{
      let responses : [string,(r:string)=>void][]=[
        ['yes',()=>{
          this.loaded=true;
          resolve(true);
        }],
        ["no",()=>{
          this.router.navigateByUrl(this.router.url);
          resolve(false);
        }]
      ];
      this.messages.reportMessage(new Message('do you want to load the module?',false,responses));
    })
  }
}
