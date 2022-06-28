import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from '@shared/constants/app-constants';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private http: HttpClient) { }

  getFileDetails(payload: any): Observable<any> {
    return this.http.get(APIURL.getdocumentdetails+'?empcode='+payload.empcode+'&docaction='+payload.dochand);    
  }

  saveDocForm(payload: any): Observable<any> {
    return this.http.post(APIURL.saveDocFormUrl, payload);    
  }
 
  getDocList(payload: any): Observable<any> {
    return this.http.get(APIURL.docListUrl+'?masterid='+payload);
  }  

  loadDocLoationDetails(payload: any): Observable<any> {
    return this.http.get(APIURL.loadEmpFormUrl+'?groupId='+payload+'&primarytable=EZTBL_DOCHD&detailtable=EZTBL_DOCDET');
  }


}
