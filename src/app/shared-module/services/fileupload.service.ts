import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from '@shared/constants/app-constants';
import { Observable } from 'rxjs';
import { CreateEmpSaveformPayload } from 'src/app/main-modules/employee-management/models/empprofile.model';


@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  constructor(private http: HttpClient) { }

  uploadAndGetgroupid(payload: any): Observable<any> {
    return this.http.post(APIURL.uploadFileUrl, payload);    
  }

  getFileDetails(groupid: any): Observable<any> {
    return this.http.get(APIURL.getFileDetailsUrl+'?groupId='+groupid);
  }    

  deleteFiles(payload: any): Observable<any> {
    return this.http.get(APIURL.deleteFileUrl+'?groupId='+payload.groupId+'&attachmentId='+payload.attachmentId);
  } 
  

}
