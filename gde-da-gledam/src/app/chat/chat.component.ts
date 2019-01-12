import { 
  Component, 
  OnInit, 
  AfterViewChecked, 
  ElementRef, 
  Output, 
  ViewChild, 
  EventEmitter } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { WebsocketService } from '../_services/websocket.service';
import { AuthService as socialAuthService } from 'angularx-social-login';
import { SharedService } from '../_services/shared.service';

interface SocialUser {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  id: string;
  idToken: string;
  authToken: string;
  photoUrl: string;
  provider: string;
}

@Component({
  selector: "px-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit, AfterViewChecked {

  socialUser: SocialUser;
  username: string;
  userPhoto: string;
  userId: string;
  userMail: string;
  loggedIn: boolean;
  chatInput: string;
  chatHistory = [];
  disableScrollDown = false;

  @ViewChild('content') content: ElementRef;
  @Output('toggler') toggler = new EventEmitter;

  constructor(
    private chatService: ChatService,
    private sharedService: SharedService,
    public websocketService: WebsocketService,
    private socialAuthService: socialAuthService
  ) {}

  ngOnInit() {
    this.getSocialUser();
    this.collectChatHistory();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {   
    this.scrollToBottom();
  }

  onDrawerClose() {
    this.toggler.emit('close');
  }

  collectChatHistory() {
    this.chatService.messages.subscribe(data => {
      this.chatHistory.push(data);
      localStorage.setItem("chat_history", JSON.stringify(this.chatHistory));
    });
  }

  onNameChange(e) {
    e.stopPropagation();
  }

  onSend(message) {
    if (message) {
      this.chatService.sendData({
        message:   message,
        id:        this.userId,
        email:     this.userMail,
        photo:     this.userPhoto,
        name:      this.username
      })
    }
    this.disableScrollDown = false;
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

  onGrabMessage(event) {
    let copyContent = event.target.childNodes[0].nodeValue;
    this.chatInput = copyContent;
  }

  /* SOCIAL LOGIN */
  
  onFacebookLogin() {
    this.socialAuthService.signIn('346737786057293');
    this.getSocialUser();
  }

  onGoogleLogin() {
    this.socialAuthService.signIn('41643208031-pm80vpelmiafks1ui00jhgp029vogjkt.apps.googleusercontent.com');
    this.getSocialUser();
  }
  
  getSocialUser() {
    this.sharedService.user.subscribe(result => {
      this.socialUser = result;
    });
    const userFromStorage = localStorage.getItem('gdedagledam_socialUser');
    if(userFromStorage) {
      const parsedUser = JSON.parse(userFromStorage);
      this.socialUser = parsedUser;
      this.username = parsedUser.name;
      this.userId = parsedUser.id;
      this.userMail = parsedUser.email;
      this.userPhoto = parsedUser.photoUrl;
      this.sharedService.user.next(userFromStorage);
    } else {
      this.socialAuthService.authState.subscribe( user => {
        this.socialUser = user;
        this.loggedIn = (user != null);
        if(this.loggedIn) {
        this.username = this.socialUser.name;
        this.userId = this.socialUser.id;
        this.userMail = this.socialUser.email;
        this.userPhoto = this.socialUser.photoUrl;
          /* Set to Local Storage */
          const UserStringify = JSON.stringify(this.socialUser)
          localStorage.setItem('gdedagledam_socialUser', UserStringify);
          this.sharedService.user.next(UserStringify);
        }
      });
    }
  }
}
