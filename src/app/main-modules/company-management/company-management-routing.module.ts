import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';

const routes: Routes = [ {
  path:"", redirectTo:"companylist", pathMatch: 'full' 
 },
 {
 path:"companylist",
 component:CompanyListComponent
},{
 path:"companyprofile/:id",
 component:CompanyProfileComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyManagementRoutingModule { }
