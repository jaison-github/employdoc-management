import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FilePickerComponent, FilePreviewModel, UploaderCaptions, ValidationError } from 'ngx-awesome-uploader';
import { delay, Observable, of } from 'rxjs';
import { AvatarAdapter } from './avatar.adapter';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnInit {
@Input() fileMaxCount: any = 100;
@Input() fileMaxSize: any = 5;

@Input() uploadType: string = 'multi';
@Input() fileExtensions: any = ['jpg', 'jpeg', 'png'];
@Input() enableCropper = false;
@Input() imgUrl:any = "";

  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
  @Output() afterFileAdded= new EventEmitter<FilePreviewModel[]>();
  @Output() afterUploadSuccess = new EventEmitter<any>();
  @Output() getValidationErr = new EventEmitter<ValidationError>();


 cropperOptions = {
  dragMode: 'crop',
  aspectRatio: 1,
  autoCrop: true,
  movable: true,
  zoomable: true,
  scalable: true,
  autoCropArea: 4.8
};
error = {show:false, msg:""};

 
  public adapter = new AvatarAdapter();
  public myFiles: FilePreviewModel[] = [];
  
  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {}

  ngOnInit(): void{
    
  }





  public onValidationError(error: ValidationError): void {
    console.log(`Validation Error ${error.error} in ${error.file.name}`);
    this.error.show = false;
       if(error.error == 'FILE_MAX_SIZE'){
         this.error.show = true;
         this.error.msg = "Document size exceeds the maximum size of " + this.fileMaxSize + 'MB.';
       }

       if(error.error == 'EXTENSIONS'){
        this.error.show = true;
        this.error.msg = "Select Valid file type (" + this.fileExtensions.join(',') + ')';
      }
      
     this.ref.detectChanges();
    this.getValidationErr.emit(error);
  }


  public onUploadSuccess(e: FilePreviewModel): void {
    console.log(e);
    this.imgUrl = e.uploadResponse;
    console.log(this.myFiles);
    this.ref.detectChanges();

   this.afterUploadSuccess.emit(e);
  }


  public onRemoveSuccess(e: FilePreviewModel) {
    console.log(e);
  }


  public onFileAdded(file: FilePreviewModel) {
    this.error.show = false;
    this.myFiles.push(file);
    this.ref.detectChanges();

  }



  public myCustomValidator(file: File): Observable<boolean> {
    if (!file.name.includes("uploader")) {
      return of(true).pipe(delay(2000));
    }
    // if (file.size > 50) {
    //  this.erro = true;
    // }
    return of(false).pipe(delay(2000));
  }
}
