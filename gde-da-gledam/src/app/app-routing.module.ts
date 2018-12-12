import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { FullListComponent } from './full-list/full-list.component';

const routes: Routes = [
  { path: 'pocetna', component: FrontPageComponent },
  { path: 'lista/:list', component: FullListComponent },
  { path: '',       redirectTo: '/pocetna',  pathMatch: 'full'  },
  { path: '**',     redirectTo: '/pocetna'   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
