import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashpageComponent } from './components/dashpage/dashpage.component';

const routes: Routes = [{
  path:"",
  component:DashpageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
