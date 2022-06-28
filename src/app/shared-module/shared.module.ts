import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { MainFooterComponent } from './layout/main-footer/main-footer.component';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { IconsService } from './services/icons.service';
import { matthemeModule } from './mattheme/mattheme.module';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { AvatarUploadComponent } from './components/avatar-upload/avatar-upload.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { AddDocumentsComponent } from './components/add-documents/add-documents.component';
import { getFileTypeIcon, printDisplayText } from './pipes/custom-pipe';
import { CustomDate, CustomDateTime } from './pipes/custome-date-pipe';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FileuploadService } from './services/fileupload.service';
import { FilePreviewComponent } from './components/file-uploader/file-preview/file-preview.component';
import { HeaderAccountInfoComponent } from './layout/header-account-info/header-account-info.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    MainHeaderComponent,
    MainFooterComponent,
    AvatarUploadComponent,
    FileUploaderComponent,
    AddDocumentsComponent,
    getFileTypeIcon,
    CustomDate,
    CustomDateTime,
    FilePreviewComponent,
    HeaderAccountInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CollapseModule,
    matthemeModule,
    MatNativeDateModule,
    MatMomentDateModule,
    FilePickerModule,
    ModalModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CollapseModule,
    matthemeModule,
    MatNativeDateModule,
    MatMomentDateModule,
    AvatarUploadComponent,
    FileUploaderComponent,
    FilePickerModule,
    ModalModule,
    getFileTypeIcon,
    CustomDate,
    CustomDateTime,
    AddDocumentsComponent,
    FilePreviewComponent
   
  ],
  providers: [
    IconsService,
    BsModalService,
    FileuploadService,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class SharedModule {}
