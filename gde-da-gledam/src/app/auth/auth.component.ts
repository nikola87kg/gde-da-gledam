import { Component, OnInit } from '@angular/core';
import { AuthService as LocalAuthService } from '../_services/auth.service';
import { AuthService as SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'px-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  role: string;
  token: string;

  registerUser= {
    email: '',
    password: ''
  }

  loginUser = {
    email: '',
    password: ''
  }

  constructor(
    private localAuthService: LocalAuthService,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
    this.onLocalLogin();
  }

  onLocalLogin() {
    this.token = this.localAuthService.getToken();
    this.role = this.localAuthService.getRole();
  }

  onFacebookLogin() {
    this.socialAuthService.signIn('346737786057293');
    this.getSocialUser();
  }

  onGoogleLogin() {
    this.socialAuthService.signIn('41643208031-pm80vpelmiafks1ui00jhgp029vogjkt.apps.googleusercontent.com');
    this.getSocialUser();
  }

  getSocialUser() {
    this.socialAuthService.authState.subscribe( user => {
      console.log('getSocialUser', user)
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  onSocialLogout() {
    this.socialAuthService.authState.subscribe( user => {
      this.user = null;
      this.loggedIn = false;
    });
  }

  onRegister() {
    this.localAuthService.registerUser({
      email: this.registerUser.email,
      password: this.registerUser.password
    }).subscribe(
      (res) => console.log(1, res.object),
      (err) => console.log(2, err)
    )

  }

  onLogin() {
    this.localAuthService.loginUser({
      email: this.loginUser.email,
      password: this.loginUser.password
    }).subscribe(
      (res) => {
        localStorage.setItem('gdedagledam_token', res.token);
        localStorage.setItem('gdedagledam_role', res.role);
      }
    )
  }

}
