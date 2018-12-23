/* Angular */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface LinkInterface {
    _id?: string;
    name: string;
    link: string;
    category: string;
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

    /* Create new link */
    post(payload) {
        return this.http.post<LinkInterface>(this.baseUrl + '/link', payload)
    }


    /* Update a link */
    put(payload, id) {
        return this.http.put<LinkInterface>(this.baseUrl + '/link/' + id, payload)
    }

    /* Delete a link */
    delete(id) {
        return this.http.delete<LinkInterface>(this.baseUrl + '/link/' + id)
    }

}
