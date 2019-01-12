import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SharedService } from '../_services/shared.service';
import { SocialUser } from 'angularx-social-login';
import { AuthService as socialAuthService } from 'angularx-social-login';

@Component({
	selector: "px-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

	user: SocialUser;
	adminID="112608340988344204295";

	constructor(
		public router: Router,
		private shareService: SharedService,
		private socialAuthService: socialAuthService
		) {}

	ngOnInit() {
		this.checkUser();
	}

	onNavigate(link) {
		this.router.navigate([link]);
	}

	checkUser() {
		this.shareService.user.subscribe( result => {
			this.user = JSON.parse(result);
		})
	}

	onLogout() {
		localStorage.removeItem('gdedagledam_socialUser');
		this.socialAuthService.signOut();
		this.socialAuthService;
		this.shareService.user.next(null);
	}
}
