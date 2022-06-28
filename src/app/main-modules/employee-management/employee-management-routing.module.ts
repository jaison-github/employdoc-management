import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpFormComponent } from './components/emp-form/emp-form.component';
import { EmpProfileComponent } from './components/emp-profile-landing/emp-profile.component';

const routes: Routes = [
  {
   path:"", redirectTo:"employeelist", pathMatch: 'full' 
  },
  {
  path:"employeelist",
  component:EmpProfileComponent
},{
  path:"employeeprofile/:id",
  component:EmpFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }
