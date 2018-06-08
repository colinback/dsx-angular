import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/*
CommunicationService is used between parent commponent in App Module and
children components in router-outlet
*/
@Injectable()
export class CommunicationService {

  // Observable sources
  private progressBarStatus = new Subject<any>();

  // Observable
  progressBarStatus$ = this.progressBarStatus.asObservable();

  sendData(status: any) {
    this.progressBarStatus.next(status);
  }
}
