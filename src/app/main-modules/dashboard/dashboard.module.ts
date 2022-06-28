import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashpageComponent } from './components/dashpage/dashpage.component';
import { DashService } from './services/doc.service';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    DashpageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers:[DashService]
})
export class DashboardModule { }
