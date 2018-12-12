import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'px-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.scss']
})
export class FullListComponent implements OnInit {

  listName: string;

  list = [
    {name: 'FromHot', url: 'http://www.fromhot.com/' },
    {name: 'StreamWatch', url: 'http://www.stream2watch.ru/' },
    {name: 'ESPN', url: 'http://www.espn.com/watch/'},
    {name: 'SonyLiv', url: 'http://www.sonyliv.com/custompage/all_sport_page'},
    {name: 'BatmanStream', url: 'https://www.batmanstream.net/'},
    {name: 'Crick Free', url: 'http://crickfree.org/'},
    {name: 'Stream Woop', url: 'https://streamwoop.net/'}
  ];

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
          this.listName = params['list'];
      });
  }

  ngOnInit() {
  }

}
