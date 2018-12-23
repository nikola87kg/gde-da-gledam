import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class ChatService {

  messages: Subject<any>;
  id = new BehaviorSubject(null);

  constructor(private websocketService: WebsocketService) {
    this.messages = websocketService.connect();
  }

  sendData(data) {
    this.messages.next(data);
  }
}