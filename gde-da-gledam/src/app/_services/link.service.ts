/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface LinkInterface {
    name: string;
    link: string;
    category: string;
    icon: string;
    vip?: boolean;
}

@Injectable({ providedIn: 'root' })
export class LinkService {
    constructor(private http: HttpClient) {}

    token = '';
    baseUrl = environment.baseUrl;

    getToken() {
        return localStorage.getItem('auth_token'); 
    }

    /* Get Links */
    getAll() {
        return this.http.get<LinkInterface[]>(this.baseUrl + '/link');
    }

    /* Post new link */
    post(payload) {
        return this.http.post<LinkInterface>(this.baseUrl + '/link', payload)
    }

}
