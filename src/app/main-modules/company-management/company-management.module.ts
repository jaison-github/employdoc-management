import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyManagementRoutingModule } from './company-management-routing.module';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyProfileComponent
  ],
  imports: [
    CommonModule,
    CompanyManagementRoutingModule,
    SharedModule
  ]
})
export class CompanyManagementModule { }
