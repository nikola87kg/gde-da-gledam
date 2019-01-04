import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'px-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

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

  ngOnInit() {
    this.token = this.authService.getToken();
    this.role = this.authService.getRole();
    console.log(this.token)
    console.log(this.role)
  }

  onRegister() {
    this.authService.registerUser({
      email: this.registerUser.email,
      password: this.registerUser.password
    }).subscribe(
      (res) => console.log(1, res.object),
      (err) => console.log(2, err)
    )

  }

  onLogin() {
    this.authService.loginUser({
      email: this.loginUser.email,
      password: this.loginUser.password
    }).subscribe(
      (res) => {
        console.log(res)
        localStorage.setItem('gdedagledam_token', res.token);
        localStorage.setItem('gdedagledam_role', res.role);
      },
      (err) => console.log(4, err)
    )
  }

  loginFacebook() {
    this.authService.loginUser('test').subscribe(
      (res) => {
        console.log(res)
        localStorage.setItem('gdedagledam_token', res.token);
        localStorage.setItem('gdedagledam_role', res.role);
      },
      (err) => console.log(4, err)
    )
  }
}
