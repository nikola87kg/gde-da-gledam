import { Component, OnInit } from '@angular/core';
import { LinkService } from '../_services/link.service';

@Component({
  selector: 'px-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  linkModel = {
    name: '',
    link: '',
    icon: '',
    category: '',
  }

  linksfromDB = [];

  categoryOptions = ['sport', 'online', 'torrent', 'apps', 'games']

  constructor(private linkService: LinkService) { }

  ngOnInit() {
    this.getAllLinks();
  }

  postLink() {
    this.linkService.post(this.linkModel).subscribe( response => {
      console.log(response);
      alert('Data is sent')
    } )
  }

  getAllLinks() {
    this.linkService.getAll().subscribe( response => {
      this.linksfromDB = response;
    } )
  }

}
