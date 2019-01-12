import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LinkService } from '../_services/link.service';
import { SharedService } from '../_services/shared.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../_services/snackbar/snackbar.component';


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
    { header: 'sport uživo', list: [] },
    { header: 'filmovi & serije online', list: [] },
    { header: 'aplikacije & igrice', list: [] },
    { header: 'titlovi', list: [] }
  ];

  screen: String;
  columns: number;

  constructor(
    public router: Router,
    public linkService: LinkService,
    public sharedService: SharedService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getScreenWidth();
    this.getAllLinks();
    this.delaySnackBar();
  }

  getScreenWidth() {
    this.sharedService.screen.subscribe( result => {
      this.screen = result
      this.setColumns();
    }
      );
  }

  setColumns() {
    let screen = this.screen;
    if (screen === 'large') {
      this.columns = 3;
    } else if (screen === 'medium') {
      this.columns = 2;
    } else if (screen === 'small') {
      this.columns = 1;
    }  
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
  
  /* Snackbar */
  delaySnackBar() {
    let isBookMarkShown = localStorage.getItem('isBookMarkShown'); 
    if(!isBookMarkShown) {
      localStorage.setItem('isBookMarkShown', 'true'); 
      setTimeout(() => {
        this.openSnackBar();
      }, 3000);
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: 'Pritisni <b>Ctrl+D</b> da me postaviš u favorite :)'
    });
  }

}
