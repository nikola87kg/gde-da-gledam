import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'px-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  link: string;
  name: string;
  constructor() { }

  ngOnInit() {
  }

}
