  
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()

  constructor() { }

  sendMsg(product: Article) {
    this.subject.next(product) //Triggering an event
  }

  getMsg() {
    return this.subject.asObservable()
  }
}
