import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseFormComponent } from './components/case/case-form/case-form.component';
import { CaseComponent } from './components/case/case.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { ClientsComponent } from './components/clients/clients.component';

const routes: Routes = [
  {
    path: "", redirectTo: "cases", pathMatch: 'full'
  },
  {
    path: "cases",
    component: CaseComponent
  },
  {
    path: "casesprofile/:id",
    component: CaseFormComponent
  },

  {
    path: "clients",
    component: ClientsComponent
  },

  {
    path: "clientprofile/:id",
    component: ClientFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawfirmManagementRoutingModule { }
