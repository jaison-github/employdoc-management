import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from '@shared/constants/app-constants';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor(private http: HttpClient) { }

  getAlerts(): Observable<any> {
    return this.http.get(APIURL.alertUrl+'?alert=Y');    
  }

 

}
