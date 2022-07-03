import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawfirmManagementRoutingModule } from './lawfirm-management-routing.module';
import { ClientsComponent } from './components/clients/clients.component';
import { CaseComponent } from './components/case/case.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CaseFormComponent } from './components/case/case-form/case-form.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';


@NgModule({
  declarations: [
    ClientsComponent,
    CaseComponent,
    CaseFormComponent,
    ClientFormComponent 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LawfirmManagementRoutingModule,
    SharedModule
  ]
})
export class LawfirmManagementModule { }
