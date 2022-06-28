import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawfirmManagementRoutingModule } from './lawfirm-management-routing.module';
import { ClientsComponent } from './components/clients/clients.component';
import { CaseComponent } from './components/case/case.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ClientsComponent,
    CaseComponent,
    
  ],
  imports: [
    CommonModule,
    LawfirmManagementRoutingModule,
    SharedModule
  ]
})
export class LawfirmManagementModule { }
