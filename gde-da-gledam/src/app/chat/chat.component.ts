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
  username: string;
  isChatOn: boolean;
  chatMessage: string;
  chatHistory = [];

  constructor(
    private chatService: ChatService,
    public websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.collectChatHistory();
    this.fetchId();
  }

  collectChatHistory() {
    this.chatService.messages.subscribe(data => {
      console.log(data);
      this.chatHistory.push(data);
      localStorage.setItem("chat_history", JSON.stringify(this.chatHistory));
    });
  }

  fetchId() {
    this.websocketService.userId.subscribe(data => {
      this.userId = data;
      this.getUsername();
      this.getChatHistory();
    });
  }

  chatToggle() {
    this.isChatOn = !this.isChatOn;
  }

  onNameChange(e) {
    e.stopPropagation();
  }

  onSend(message) {
    if (message) {
      this.chatService.sendData({
        message: message,
        name: this.username
      });
    }
  }

  setUsername() {
    if (this.username) {
      localStorage.setItem("chat_username", this.username);
    } else {
      this.username = "Gost " + this.userId;
    }
  }

  getUsername() {
    const storageName = localStorage.getItem("chat_username");
    console.log(storageName);
    if (storageName && storageName !== '') {
      this.username = storageName;
    } else if (this.userId) {
      this.username = "Gost " + this.userId;
    } else {
      this.username = "Gost";
    }
  }

  getChatHistory() {
    const storageHistory = localStorage.getItem("chat_history");
    console.log(storageHistory);
    if (storageHistory && storageHistory !== "") {
      this.chatHistory = JSON.parse(storageHistory);
    } 
  }
}
