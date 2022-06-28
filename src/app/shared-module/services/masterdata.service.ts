import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from '@shared/constants/app-constants';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {

  constructor(private http: HttpClient) { }

  getMasterdata(masterid: string): Observable<any> {
    return this.http.get(APIURL.masterdataApiUrl+'?masterid='+masterid);    
  }


 
  

}
