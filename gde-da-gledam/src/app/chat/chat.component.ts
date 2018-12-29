import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: "px-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  userId: string;
  username: string;
  chatMessage: string;
  chatHistory = [];
  disableScrollDown = false;
  @ViewChild('content') content: ElementRef;

  constructor(
    private chatService: ChatService,
    public websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.collectChatHistory();
    this.fetchId();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {   
    this.scrollToBottom();
  }

  collectChatHistory() {
    this.chatService.messages.subscribe(data => {
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

  onNameChange(e) {
    e.stopPropagation();
  }

  onSend(message) {
    if (message) {
      this.chatService.sendData({
        message: message,
        name: this.username
      })
    }
    this.disableScrollDown = false;
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
    if (storageHistory && storageHistory !== "") {
      this.chatHistory = JSON.parse(storageHistory);
    } 
  }

  scrollToBottom() {
    if (this.disableScrollDown) {
        return
    }
    try {
        this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onScroll() {
    try {
      let el = this.content.nativeElement
      let atBottom = el.scrollHeight - el.scrollTop === el.clientHeight
      if (atBottom) {
        this.disableScrollDown = false
    } else {
        this.disableScrollDown = true
    }
    } catch (err) {}
  } 
}
