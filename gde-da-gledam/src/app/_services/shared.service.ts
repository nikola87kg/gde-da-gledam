import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    constructor() {}

    screen = new BehaviorSubject(null);
    user = new BehaviorSubject(null);

}
