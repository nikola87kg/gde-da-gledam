import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'px-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {
    title = 'gdeDaGledam.rs';

    constructor(public router: Router) {
        this.scrollTop();
    }

    ngOnInit() {
    }

    scrollTop() {
        this.router.events
            .subscribe(evt => {
                if (evt instanceof NavigationEnd) {
                    document.body.scrollTop = 0;
                    window.scrollTo(0,0);
                }
            });
    }
}
