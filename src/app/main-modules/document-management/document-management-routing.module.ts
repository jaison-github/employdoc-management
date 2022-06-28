import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocExpiryComponent } from './components/doc-expiry/doc-expiry.component';
import { DocInOutListComponent } from './components/doc-in-out-list/doc-in-out-list.component';
import { DocNewInOutComponent } from './components/doc-new-in-out/doc-new-in-out.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"docinoutlist",
    pathMatch:"full"
  },
  {
    path: 'docinoutlist',
    component: DocInOutListComponent,
  },
  {
    path: 'docinoutaction/:id',
    component: DocNewInOutComponent,
  },
  {
    path: 'documentexpirylist',
    component: DocExpiryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentManagementRoutingModule {}
