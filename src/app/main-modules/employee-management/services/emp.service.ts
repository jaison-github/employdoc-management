import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from '@shared/constants/app-constants';
import { MasterDataLookUpTypes } from '@shared/models/master.models';
import { MasterDataStoreService } from '@shared/stores/master-data/master-data.state';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(private http: HttpClient, private masterstore: MasterDataStoreService) { }


  validateEmpForm(primarykey: any): Observable<any> {
    return this.http.get(APIURL.validateEmpFormUrl+"?primarykey="+primarykey+'&procname=sp_empsave');    
  }

  
  saveEmpForm(payload: any): Observable<any> {
    return this.http.post(APIURL.saveEmpFormUrl, payload);    
  }

  getEmpList(payload: any): Observable<any> {
    return this.http.get(APIURL.empListUrl+'?masterid='+payload);
  }  

  
  loadEmpDetails(payload: any): Observable<any> {
    return this.http.get(APIURL.loadEmpFormUrl+'?groupId='+payload+'&primarytable=EZTBL_EMPHD&detailtable=EZTBL_EMPDET');
  }
 
  getEmpModuleMasterData(){
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.gendermaster);
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.departmentmaster);
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.doctypes);
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.cmpmaster);
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.professionmaster);
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.nationmaster);
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.vpmaster);
    this.masterstore.getMasterDatalist(MasterDataLookUpTypes.doctypes);
  }
    
  

}
