import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum MODES {
  CREATE,
  EDIT,
}

export interface StateUpdate {
  mode: MODES;
  id?: number;
}

@Injectable()
export class SharedState {
  private modeValue: MODES = MODES.EDIT;
  private idValue?: number;

  changes: Observable<StateUpdate>;

  get id(): number | undefined {
    return this.idValue;
  }

  get mode(): MODES {
    return this.modeValue;
  }

  constructor() {
    this.changes = new Subject<StateUpdate>();
  }

  update(mode: MODES, id?: number) {
    this.modeValue = mode;
    this.idValue = id;

    (this.changes as Subject<StateUpdate>).next({
      mode: this.modeValue,
      id: this.idValue,
    });
  }
}
