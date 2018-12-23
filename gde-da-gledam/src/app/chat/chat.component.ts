import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: "px-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  userId: string;
  isChatOn: boolean;
  chatMessage: string;
  chatHistory = [];

  constructor(
    private chatService: ChatService, 
    public websocketService: WebsocketService) {}

  ngOnInit() {
    this.collectChatHistory();
    this.fetchId();
  }

  collectChatHistory() {
    this.chatService.messages.subscribe(data => {
      this.chatHistory.push(data);
    });
  }

  fetchId() {
    this.websocketService.userId.subscribe(data => {
      this.userId = data;
    });
  }

  chatToggle() {
    this.isChatOn = !this.isChatOn;
  }

  onSend(message) {
    if (message) {
      this.chatService.sendData(message);
    }
  }
}
