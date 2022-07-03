import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from '@auth/auth.module';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import { UserInfoStoreService } from '@shared/stores/master-data/user-data.state';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadStoreService } from '@shared/stores/master-data/file-upload.state';
import { EmpStoreService } from './main-modules/employee-management/store/emp-management.state';
import { MatExpansionModule } from '@angular/material/expansion';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,    
    AuthModule,
    MatButtonModule,
    ToastrModule.forRoot( {timeOut: 10000,        
      closeButton: true,       
      maxOpened: 1,
      autoDismiss: true,
      enableHtml: true}),     
  ],
  providers: [MasterDataStoreService, UserInfoStoreService, FileUploadStoreService, EmpStoreService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
