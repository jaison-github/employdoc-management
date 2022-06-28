import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentManagementRoutingModule } from './document-management-routing.module';
import { DocInOutListComponent } from './components/doc-in-out-list/doc-in-out-list.component';
import { DocNewInOutComponent } from './components/doc-new-in-out/doc-new-in-out.component';
import { SharedModule } from '@shared/shared.module';
import { DocService } from './services/doc.service';
import { DocExpiryComponent } from './components/doc-expiry/doc-expiry.component';

@NgModule({
  declarations: [DocInOutListComponent, DocNewInOutComponent, DocExpiryComponent],
  imports: [CommonModule, DocumentManagementRoutingModule, SharedModule],
  providers: [DocService]
})
export class DocumentManagementModule {}
