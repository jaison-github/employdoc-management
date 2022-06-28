import { Injectable } from "@angular/core";

import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { createFileuploadModel } from "@shared/models/doc-upload.model";
import { MasterDataLookUpTypes } from "@shared/models/master.models";
import { MasterdataService } from "@shared/services/masterdata.service";
import * as _ from "lodash";
import { catchError, concatMap, EMPTY, mergeMap, Observable } from "rxjs";

export const enum LoadingState {
    INIT = "INIT",
    LOADING = "LOADING",
    LOADED = "LOADED"
}
export interface ErrorState {
    errorMsg: string;
}

export type CallState = LoadingState | ErrorState;


interface MasterDataState {   
    genderList: any[]; 
    departmentList: any[];
    docList: any[];
    companyList: any[];
    nationList: any[];
    vpmasterList: any[];
    professionList: any[];   
    misc: [],           
    callState: CallState;
    executed: false;
}

// Utility function to extract the error from the state
function getError(callState: CallState): LoadingState | string | null {
    if ((callState as ErrorState).errorMsg !== undefined) {
        return (callState as ErrorState).errorMsg;
    }

    return null;
}
@Injectable()
export class MasterDataStoreService extends ComponentStore<MasterDataState> {
    constructor(private masterService: MasterdataService) {
        super({
            genderList: [], 
            departmentList: [],
            docList: [],
            companyList: [], 
            nationList: [],
            vpmasterList: [],
            professionList: [], 
            misc: [],
            callState: LoadingState.INIT,
            executed: false,
        });
    }

    // SELECTORS
    private readonly genderList$: Observable<any[]> = this.select(state => state.genderList);
    private readonly departmentList$: Observable<any[]> = this.select(state => state.departmentList);
    private readonly docList$: Observable<any[]> = this.select(state => state.docList);
    private readonly companyList$: Observable<any[]> = this.select(state => state.companyList);
    private readonly nationList$: Observable<any[]> = this.select(state => state.nationList);
    private readonly vpmasterList$: Observable<any[]> = this.select(state => state.vpmasterList);
    private readonly professionList$: Observable<any[]> = this.select(state => state.professionList);
    private readonly misc$: Observable<any[]> = this.select(state => state.misc);

    private readonly callState$: Observable<any> = this.select(state => state.callState);
    
    private readonly loading$: Observable<boolean> = this.select(
        state => state.callState === LoadingState.LOADING
    );
    private readonly error$: Observable<string> = this.select(state =>
        getError(state.callState)
    );


    // ViewModel for the component
    readonly vm$ = this.select(
        this.genderList$,
        this.departmentList$,
        this.docList$,
        this.companyList$,
        this.nationList$,
        this.vpmasterList$,
        this.professionList$,
        this.loading$,
        this.error$,
        this.callState$,        
        (genderList, departmentList,docList, companyList, nationList,vpmasterList, professionList, loading, error, callState) => ({
            genderList,
            departmentList,
            docList,
            companyList,
            nationList,
            vpmasterList,
            professionList,
            loading,           
            error,  
            callState,                    
        })
    );


    readonly vmMisc$ = this.select(
      this.misc$,   
      (misc) => ({
        misc                    
      })
  );
    

// UPDATERS
  readonly updateError = this.updater((state: MasterDataState, error: string) => {
    return {
      ...state,
      callState: {
        errorMsg: error
      }
    };
  });

  readonly setLoading = this.updater((state: MasterDataState) => {
    return {
      ...state,
      callState: LoadingState.LOADING
    };
  });

  readonly setLoaded = this.updater((state: MasterDataState) => {
    return {
      ...state,
      callState: LoadingState.LOADED
    };
  });

  readonly updateGenderlist = this.updater((state: MasterDataState, _genderList: any[]) => {
    return {
      ...state,
      error: "",
      genderList: _genderList
    };
  });

  readonly updateDepartmentList = this.updater((state: MasterDataState, newData: any[]) => {
    return {
      ...state,
      error: "",
      departmentList:  newData
    };
  });

  readonly updateDoclist = this.updater((state: MasterDataState, newData: any[]) => {
    return {
      ...state,
      error: "",
      docList:  newData
    };
  });


  readonly updateCompList = this.updater((state: MasterDataState, newData: any[]) => {
    return {
      ...state,
      error: "",
      companyList:  newData
    };
  });


  readonly updateNationList = this.updater((state: MasterDataState, newData: any[]) => {
    return {
      ...state,
      error: "",
      nationList:newData
    };
  });

  
  readonly updateVpList = this.updater((state: MasterDataState, newData: any[]) => {
    return {
      ...state,
      error: "",
      vpmasterList:  newData
    };
  });


  readonly updateProfessionList = this.updater((state: MasterDataState, newData: any[]) => {
    return {
      ...state,
      error: "",
      professionList:  newData
    };
  });


  readonly updateMisc = this.updater((state: MasterDataState, newData: any) => {
    return {
      ...state,
      misc:  newData
    };
  });


// EFFECTS
readonly getMasterDatalist = this.effect((KEY$: Observable<string>) =>
 {
    return KEY$.pipe(
      mergeMap((KEY: string) => {
        this.setLoading();
        return this.masterService.getMasterdata(KEY).pipe(
          tapResponse(
            data => {
              this.setLoaded();
             if(MasterDataLookUpTypes.gendermaster == KEY){
              this.updateGenderlist(data);
             }

             if(MasterDataLookUpTypes.departmentmaster == KEY){
              this.updateDepartmentList(data);
             }

             if(MasterDataLookUpTypes.doctypes == KEY){
              this.updateDoclist(data);
             }
             if(MasterDataLookUpTypes.nationmaster == KEY){
              this.updateNationList(data);
             }

             if(MasterDataLookUpTypes.cmpmaster == KEY){
              _.forEach(data, (obj, index)=> {
                obj.code=parseInt(obj.code);
              });  
              this.updateCompList(data);
             }

             if(MasterDataLookUpTypes.vpmaster == KEY){
              _.forEach(data, (obj, index)=> {
                obj.code=parseInt(obj.code);
              });  
              this.updateVpList(data);
             }
             if(MasterDataLookUpTypes.professionmaster == KEY){
              this.updateProfessionList(data);
             }

             if(MasterDataLookUpTypes.empdropdownlist == KEY){
              this.updateMisc(data);
             }


            },
            (e: string) => this.updateError(e)
          ),

          catchError(() => EMPTY)
        );
      })
    );
  });

}





    

  
