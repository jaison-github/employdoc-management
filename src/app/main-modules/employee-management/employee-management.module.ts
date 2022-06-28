import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmpProfileComponent } from './components/emp-profile-landing/emp-profile.component';
import { EmpService } from './services/emp.service';
import { EmpFormComponent } from './components/emp-form/emp-form.component';
import { SharedModule } from '@shared/shared.module';
import { matthemeModule } from '@shared/mattheme/mattheme.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmplistTabelviewComponent } from './components/emplist-tabelview/emplist-tabelview.component';


@NgModule({
  declarations: [
    EmpProfileComponent,
    EmpFormComponent,
    EmplistTabelviewComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    SharedModule        
  ],
  providers:[
    EmpService
  ]
})
export class EmployeeManagementModule { }
