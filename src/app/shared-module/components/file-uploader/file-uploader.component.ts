import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TypeFile } from '@shared/models/doc-upload.model';
import { IconsService } from '@shared/services/icons.service';
import { FilePickerComponent, FilePreviewModel, ValidationError } from 'ngx-awesome-uploader';
import { FileAdapter } from './file.adapter';



@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() editFiles: FilePreviewModel[] = [];
  // @Input() typeFiles: Array<string>;
  @Input() onceFile?: boolean = false;
  @Input() metaData?: any;
  @Input() urlUploadFile?: string;
  @Input() urlRemoveFile?: string;
  @Input() type: string; // method verb name
  @Input() docId?: string;
  @Input() hideDropArea: boolean = false;
  @Input() fileMaxCount: number;
  @Output() loadedRemovedFiles = new EventEmitter<any[]>();
  @Output() loadedFiles = new EventEmitter<FilePreviewModel[]>();
  @Output() afterDocUpload = new EventEmitter<FilePreviewModel[]>();
  @Output() afterDocDelete = new EventEmitter<FilePreviewModel[]>();


@Input() fileMaxSize: any = 5;
@Input() uploadType: 'multi' | 'single' = 'multi';
@Input() fileExtensions: any = [];
@Input() enableCropper = false;
@Input() imgUrl:any = "";



  typeFiles = ['.png','.jpeg', 'png','jpeg'];

  @Output() validationErrors = new EventEmitter<any>();
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
  @ViewChild('drop', { static: true })
  dropButton: ElementRef<HTMLButtonElement>;
  adapter: FileAdapter;
  myFiles: FilePreviewModel[] = [];
  TypeFile = TypeFile;
  showDrop: boolean = true;
  fileMetaData: any;
  error = {show:false, msg:""};

  @Input() activeDocType:  any = null;;
  constructor( private _http: HttpClient,  private _iconsService: IconsService,private ref: ChangeDetectorRef) {
    this._iconsService.registerIcons(this.icons);
  }

  ngOnInit(): void {

    if(this.docId) {
      this.showDrop = false;
    }

    this.uploadType = this.onceFile ? 'single' : 'multi';
    if (!this.fileMetaData) {
      this.fileMetaData = this.metaData;
    }
    this.adapter = new FileAdapter(
      this._http,
      this.urlUploadFile,
      this.urlRemoveFile,
      this.docId,
      this.type,
      this.fileMetaData
    );
  }

  ngDoCheck() {

    // we are using this for view mode to update the edit file;
    if (this.editFiles && this.editFiles.length > 0) {
      this.uploader.setFiles(this.editFiles);
    } else {
      this.showDrop = true;
    }
  }

  public onValidationError(error: ValidationError): void {
    if(error.error == 'FILE_MAX_SIZE'){
      this.error.show = true;
      this.error.msg = "Document size exceeds the maximum size of " + this.fileMaxSize + 'MB.';
    }

    if(error.error == 'EXTENSIONS'){
     this.error.show = true;
     this.error.msg = "Select Valid file type (" + this.fileExtensions.join(',') + ')';
   }

   this.ref.detectChanges();

    this.validationErrors.emit(error);
  }

  public onUploadSuccess(e: FilePreviewModel): void {
    let files: FilePreviewModel[] = [];

    if (e.uploadResponse) {
      files.push(e);
      this.emitFilesOnSuccess(e);
    }   
    this.showDrop = false;
    this.ref.detectChanges();

  }

  public onRemoveSuccess(e: FilePreviewModel): void {
    let files: FilePreviewModel[] = [];
    this.showDrop = true;
    files.push(e);
    this.emitOnRemoveSuccess({file:e, fileList: this.myFiles});
    this.ref.detectChanges();

  }

  removeFile(fileItem) {
    this.uploader.removeFile(fileItem);
    this.showDrop = true;
  }
  public onFileRemoved(file: FilePreviewModel): void {
    this.myFiles = this.myFiles.filter(
      (item) => item.fileName !== file.fileName
    );
    if (this.myFiles.length === 0) {
      this.showDrop = true;
    } else {
      this.showDrop = false;
    }
    this.showDrop = true;
    this.emitFiles(this.myFiles);
    this.ref.detectChanges();

  }

  public onFileAdded(file: FilePreviewModel): void {
    this.myFiles.push(file);
    this.showDrop = false;

    this.emitFiles(this.myFiles);
    this.myFiles.forEach((element) => {
      switch (element.file.type) {
        case TypeFile.PNG:
          //this._iconsService.registerIcons(['png-icon']);
          break;
        case TypeFile.PDF:
         // this._iconsService.registerIcons(['pdf-icon']);
          break;
        default:
          break;
      }
    });
    this.ref.detectChanges();

  }

  // btnClick(): void {
  //   const el: HTMLElement = this.dropButton.nativeElement;
  //   el.click();
  // }

  private emitFiles(files: FilePreviewModel[]): void {
   // this.loadedFiles.emit(files);
  }

  private emitFilesOnSuccess(files:any): void {
    this.afterDocUpload.emit(files);
  }

  private emitOnRemoveSuccess(files: any): void {
    this.afterDocDelete.emit(files);
  }

  private get icons(): Array<string> {
    return [
      "pdf-icon",
      "jpg-icon",
      "pdf-file-icon",
      "png-icon",
      "file-remove",
      "folder",
      "view-files",
      "download",
    ];
  }
}
