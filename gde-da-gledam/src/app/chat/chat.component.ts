import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'px-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  isChatOn: boolean;
  chatMessage:string = 'cao...';
  chatHistory = [];

  constructor() { }

  ngOnInit() {
  }

  chatToggle() {
    this.isChatOn = !this.isChatOn
  }

  pushMessage(message) {
    if(message) {
      this.chatHistory.push(message);
    }
  }

}
