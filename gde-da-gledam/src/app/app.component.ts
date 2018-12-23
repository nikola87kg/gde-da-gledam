import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from './_services/shared.service';

@Component({
    selector: 'px-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {

    title = 'gdeDaGledam.rs';
    screen: String;

    constructor(
        public router: Router,
        public sharedService: SharedService    
    ) {
        this.scrollTop();
    }

    ngOnInit() {
        this.checkWidth();
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
    
    /* Dinamically check width of the screen */
    @HostListener('window:resize') onResize() {
        this.checkWidth();
    }
    
    checkWidth() {
        const innerWidth = window.innerWidth;
        if (innerWidth > 1028) {
            this.screen = 'large';
        } else if (innerWidth > 768) {
            this.screen = 'medium';
        } else {
            this.screen = 'small';
        }
        this.sharedService.screen.next(this.screen);
    }
}
