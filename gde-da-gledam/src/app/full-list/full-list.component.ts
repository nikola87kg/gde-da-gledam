import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../_services/link.service';

@Component({
  selector: 'px-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.scss']
})
export class FullListComponent implements OnInit {

  listName: string;

  list = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private linkService: LinkService
    ) {
    this.activatedRoute.params.subscribe(params => {
          this.listName = params['list'];
      });
  }

  ngOnInit() {
    this.getAllLinks();
  }

  getAllLinks() {
    this.linkService.getAll().subscribe( response => {
      this.list = response.filter( item => {
        return item.category === this.listName
      });
    })
  }

}
