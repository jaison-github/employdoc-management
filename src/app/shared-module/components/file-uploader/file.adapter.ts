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


export class FileAdapter extends FilePickerAdapter {
  constructor(
    private http: HttpClient,
    private urlUpload?: string,
    private urlRemoveFile?: string,
    private docId?: any,
    private type?: string,
    private metaData?: any
  ) {
    super();
  }

  
  private _documentId : string;
  public get documentId() : string {
    return this._documentId;
  }
  public set documentId(v : string) {
    this._documentId = v;
  }
  
  
  private _docMetaData : string;
  public get docMetaData() : string {
    return this._docMetaData;
  }
  public set docMetaData(v : string) {
    this._docMetaData = v;
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
    const fileContentBase64 = (await this.fileToBase64(fileItem.file)).split(
      ";base64,"
    )[1];

    const filedetails: any = {
      OriginalFile: fileItem,
      DocumentFileName: fileItem.fileName,
      DocumentData: fileContentBase64,
      DocumentFileType: fileItem.file.type,
      DocumentCode: "",
      DocumentFileSize: "",
      DocumentName: "",
      IsRequired: true,
    };
    const fileUploadResData = {
      body: filedetails,
      status: UploadStatus.UPLOADED,
    };
    selectUploadFileCompletedSubject$.next(fileUploadResData);
    return filedetails;
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
