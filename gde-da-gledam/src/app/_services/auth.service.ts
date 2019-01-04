/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface UserInterface {
    email: string;
    password: string;
    role?: string;
    token?: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

    token = '';
    base_url = environment.base_url;

    getToken() {
        return localStorage.getItem('gdedagledam_token'); 
    }

    getRole() {
        return localStorage.getItem('gdedagledam_role'); 
    }

    /* Register New User */
    registerUser(payload) {
        return this.http.post<{object: any}>(
            this.base_url + '/auth/register', payload
        );
    }

    /* Login Existing User */
    loginUser(payload) {
        return this.http.post<UserInterface>(
            this.base_url + '/auth/login', payload
        )
    }

    /* Login Existing User */
    loginFacebook(payload) {
        return this.http.post<UserInterface>(
            this.base_url + '/auth/facebook', payload
        )
    }

}
