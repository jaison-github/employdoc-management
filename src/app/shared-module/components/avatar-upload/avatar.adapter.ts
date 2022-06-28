import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import {
  FilePickerAdapter,
  UploadResponse,
  UploadStatus,
  FilePreviewModel,
} from 'ngx-awesome-uploader';
import { DocumentUploadModel } from '@shared/models/doc-upload.model';

export enum FileSettings {
  NoRemoveAPI = 'No_Remove_API',
}


export class AvatarAdapter extends FilePickerAdapter {
  constructor(
 
  ) {
    super();
  }

  
 

  //This is upload adapter
  public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    const selectUploadFileCompletedSubject$ = new Subject<UploadResponse>();
    this.fileUploadDispatchActions(fileItem, selectUploadFileCompletedSubject$);

    return selectUploadFileCompletedSubject$.asObservable();
  }


  private async fileUploadDispatchActions(
    fileItem,
    selectUploadFileCompletedSubject$
  ) {
    const fileContentBase64 = (await this.fileToBase64(fileItem.file));

      const fileUploadResData = {
      body: fileContentBase64,
      status: UploadStatus.UPLOADED,
    };
    selectUploadFileCompletedSubject$.next(fileUploadResData);
    return fileContentBase64;
  }

  private fileToBase64(file): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  
  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    const selectRemoveFileCompletedSubject$ = new Subject<any>();
    let resResult: any = null;
    resResult = {
      Data: null,
      status: UploadStatus.UPLOADED,
    };
    let filedetails: DocumentUploadModel[] = [];

    setTimeout(() => {
      selectRemoveFileCompletedSubject$.next(resResult);
    }, 200);
    return selectRemoveFileCompletedSubject$.asObservable();
  }
}
