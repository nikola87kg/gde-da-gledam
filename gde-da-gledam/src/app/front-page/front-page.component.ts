import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LinkService } from '../_services/link.service';
import { SharedService } from '../_services/shared.service';


export interface Tile {
  list: Array<any>;
  header: string;
}

@Component({
  selector: 'px-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  tiles: Tile[] = [
    { header: 'torenti', list: [] },
    { header: 'sport uživo', list: [] }
  ];

  screen: String;

  constructor(
    public router: Router,
    public linkService: LinkService,
    public sharedService: SharedService 
  ) {}

  ngOnInit() {
    this.getScreenWidth();
    this.getAllLinks();
  }

  getScreenWidth() {
    this.sharedService.screen.subscribe( result => this.screen = result);
  }

  getAllLinks() {
    this.linkService.getAll().subscribe( response => {
      this.tiles.forEach( tile => {
        tile.list = response.filter( 
          item => item.category === tile.header 
        );
      });
    })
  }

  goToList(list) {
    this.router.navigate(['/lista/' + list])
  }
  
}
