import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'px-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {
  }

  goToFrontPage() {
      this.router.navigate(['/pocetna'])
  }

  goToAdminPage() {
      this.router.navigate(['/admin'])
  }

}
