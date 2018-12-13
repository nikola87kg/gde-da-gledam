import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';

@Component({
  selector: 'px-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  isChatOn: boolean;
  chatMessage:string = 'cao...';
  chatHistory = [];

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      this.chatHistory.push(msg.text);
    })
  }

  chatToggle() {
    this.isChatOn = !this.isChatOn
  }

  pushMessage(message) {
    if(message) {
      this.chat.sendMsg(message);
    }
  }

}
