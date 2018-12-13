import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  list: Array<string>;
  header: string;
}

@Component({
  selector: 'px-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  tiles: Tile[] = [
    { header: 'Sport', text: '1', cols: 1, rows: 1, color: 'white', list: ['wwww.watchthegame.rs', 'www.arenasportlive.com', 'www.sportklub.rs', '4', 'test'] },
    { header: 'Filmovi', text: '2', cols: 1, rows: 1, color: 'white', list: ['www.piratebay.org', 'www.rutracker.org', '3', '4', 'test'] },
    { header: 'Serije', text: '3', cols: 1, rows: 1, color: 'white', list: ['1', '2', '3', '5', 'test'] },
    { header: 'Aplikacije', text: '4', cols: 1, rows: 1, color: 'white', list: ['2', '3', '4', '5', 'test'] },
    { header: 'Igrice', text: '5', cols: 1, rows: 1, color: 'white', list: ['1', '3', '4', '5', 'test'] },
    { header: 'Blabla', text: '6', cols: 1, rows: 1, color: 'white', list: ['1', '3', '4', '5', 'test'] },
  ];

  constructor(public router: Router) {}

  ngOnInit() {
  }

  goToList(list) {
    this.router.navigate(['/lista/' + list])
  }
  
}
