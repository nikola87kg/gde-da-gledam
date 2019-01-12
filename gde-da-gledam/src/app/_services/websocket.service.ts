import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: "root" })
export class WebsocketService {
  // Our socket connection
  private socket;

  constructor() {}

  connect() {
    this.socket = io(environment.socket_url);

    let observable = new Observable(observer => {
      this.socket.on("message", data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    let observer = {
      next: data => {
        this.socket.emit("message", data);
      }
    };
    return Subject.create(observer, observable);
  }
}