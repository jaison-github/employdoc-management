import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from '@shared/constants/app-constants';
import { MasterDataLookUpTypes } from '@shared/models/master.models';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private masterstore: MasterDataStoreService) { }


  validateForm(primarykey: any): Observable<any> {
    return this.http.get(APIURL.validateForm +"?primarykey="+primarykey+'&procname=sp_empsave');    
  }

  
  saveForm(payload: any): Observable<any> {
    return this.http.post(APIURL.saveForm, payload);    
  }

  getList(payload: any): Observable<any> {
    return this.http.get(APIURL.getList+'?masterid='+payload);
  }  

  
  loadData(payload: any): Observable<any> {
    return this.http.get(APIURL.loadData+'?groupId='+payload+'&primarytable=EZTBL_COMPNYHD&detailtable=EZTBL_COMPANYDET');
  }
 
  getCompMasterData(){
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.doctypes);
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.licenselist);
  }
    
  

}
