import { Component, OnInit, ViewChild } from '@angular/core';
import { LinkService } from '../_services/link.service';

/* Material */
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'px-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  previousPageIndex = 0;
  dataSource;
  linksfromDB = [];
  linkModel = {name: '', link: '',  category: '', vip: false};
  categoryOptions = ['sport', 'online', 'torrent', 'apps', 'games'];
  displayedColumns = [ 'position', 'link', 'name', 'vip', 'category', 'created', 'remove' ];

  constructor(private linkService: LinkService) { }

  ngOnInit() {
    this.getAllLinks();
  }

  postLink() {
    this.linkService.post(this.linkModel).subscribe( response => {
      this.linkModel = {name: '', link: '', category: '', vip: false}
      this.getAllLinks();
    } )
  }

  deleteLink(item) {
    this.linkService.delete(item._id).subscribe( () => {
      this.getAllLinks();
    })
  }

  getAllLinks() {
    this.linkService.getAll().subscribe( response => {
      this.linksfromDB = response.sort();
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } )
  }

  onPageChanged() {
    const pageSize = this.paginator.pageSize;
    const pageIndex = this.paginator.pageIndex;
    this.previousPageIndex = pageSize * pageIndex;
  }

}
