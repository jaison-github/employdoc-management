import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from '@shared/services/icons.service';
import { FileUploadStoreService } from '@shared/stores/master-data/file-upload.state';
// import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {
  @Input() fileList: any[] = [];
  vmFile$ = this.fileStore.vm$;
  subscription: Subscription[] = [];
  activeGroupId = null;
  constructor(private fileStore: FileUploadStoreService,     private _iconsService: IconsService, 
    ) { 
      this._iconsService.registerIcons(this.icons);
    }

  ngOnInit(): void {
   
  }
  removeFile(file): void{
    //_.remove(this.fileList,{});

  }

  private get icons(): Array<string> {
    return [
      "pdf-icon",
      "icon-pdf",
      "jpg-icon",
      "pdf-file-icon",
      "png-icon",
      "file-remove",
      "folder",
      "view-files",
      "download",
      "icon-close"
    ];
  }

}
