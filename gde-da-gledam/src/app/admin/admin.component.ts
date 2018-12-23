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
  createButton = {text: 'Kreiraj novi link', color: 'accent', type: 'create'}
  updateButton = {text: 'Ažuriraj link', color: 'warn', type: 'update'}
  submitButton = this.createButton;
  updateItemId: string;
  previousPageIndex = 0;
  dataSource;
  linksfromDB = [];
  linkModel = {name: '', link: '',  category: '', vip: false};
  categoryOptions = ['sport', 'online', 'torrent', 'apps', 'games'];
  displayedColumns = [ 'position', 'link', 'name', 'vip', 'category', 'created', 'update' , 'remove' ];

  constructor(private linkService: LinkService) { }

  ngOnInit() {
    this.getAllLinks();
  }

  onFormSubmit() {
    if(this.submitButton.type==="create") {
      this.createLink();
    } else if(this.submitButton.type==="update") {
      this.updateLink();
    }
  }

  onPopulateFormWithItem(item) {
      this.linkModel = {name: item.name, link: item.link, category: item.category, vip: item.vip};
      this.updateItemId = item._id;
      this.submitButton = this.updateButton;
  }

  createLink() {
    this.linkService.post(this.linkModel).subscribe( response => {
      this.getAllLinks();
    } )
  }

  updateLink() {
    this.linkService.put(this.linkModel, this.updateItemId).subscribe( response => {
      this.getAllLinks();
    } )
  }

  onDeleteLink(item) {
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
      this.linkModel = {name: '', link: '', category: '', vip: false};
      this.submitButton = this.createButton;
      this.updateItemId = null;
    } )
  }

  onResetForm() {
    this.linkModel = {name: '', link: '', category: '', vip: false};
    this.submitButton = this.createButton;
    this.updateItemId = null;
  }

  onPageChanged() {
    const pageSize = this.paginator.pageSize;
    const pageIndex = this.paginator.pageIndex;
    this.previousPageIndex = pageSize * pageIndex;
  }

}
