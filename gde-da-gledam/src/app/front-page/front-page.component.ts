import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkService } from '../_services/link.service';


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
    { header: 'torrent', list: [] },
    { header: 'sport', list: [] }
  ];


  constructor(
    public router: Router,
    public linkService: LinkService
  ) {}

  ngOnInit() {
    this.getAllLinks();
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
