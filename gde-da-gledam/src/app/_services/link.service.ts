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
    base_url = environment.base_url;

    getToken() {
        return localStorage.getItem('auth_token'); 
    }

    /* Get Links */
    getAll() {
        return this.http.get<LinkInterface[]>(this.base_url + '/link');
    }

    /* Create new link */
    post(payload) {
        return this.http.post<LinkInterface>(this.base_url + '/link', payload)
    }


    /* Update a link */
    put(payload, id) {
        return this.http.put<LinkInterface>(this.base_url + '/link/' + id, payload)
    }

    /* Delete a link */
    delete(id) {
        return this.http.delete<LinkInterface>(this.base_url + '/link/' + id)
    }

}
