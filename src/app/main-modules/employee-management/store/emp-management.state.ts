import { Injectable } from "@angular/core";

import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { createFileuploadModel } from "@shared/models/doc-upload.model";
import { MasterDataLookUpTypes } from "@shared/models/master.models";
import { FileuploadService } from "@shared/services/fileupload.service";
import { MasterdataService } from "@shared/services/masterdata.service";
import * as _ from "lodash";
import { catchError, concatMap, EMPTY, Observable } from "rxjs";
import { EmpService } from "../services/emp.service";

export const enum LoadingState {
    INIT = "INIT",
    LOADING = "LOADING",
    LOADED = "LOADED"
}
export interface ErrorState {
    errorMsg: string;
}

export type CallState = LoadingState | ErrorState;


interface EmpState {   
    empId: string; 
    empList:any[];             
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
export class EmpStoreService extends ComponentStore<EmpState> {
    constructor(private empService: EmpService) {
        super({
            empId:null,
            empList: [],                        
            callState: LoadingState.INIT,
            executed: false,
        });
    }

    public activeempId: string = null;

    // SELECTORS
    private readonly empId$: Observable<string> = this.select(state => state.empId);

    private readonly empList$: Observable<any[]> = this.select(state => state.empList);
    private readonly callState$: Observable<any> = this.select(state => state.callState);
    
    private readonly loading$: Observable<boolean> = this.select(
        state => state.callState === LoadingState.LOADING
    );
    private readonly error$: Observable<string> = this.select(state =>
        getError(state.callState)
    );


    // ViewModel for the component
    readonly vm$ = this.select(
        this.empId$,
        this.empList$,        
        this.loading$,
        this.error$,
        this.callState$,        
        (empId, empList,loading, error, callState) => ({
          empId,
          empList,          
            loading,           
            error,  
            callState,                    
        })
    );


// UPDATERS
  readonly updateError = this.updater((state: EmpState, error: string) => {
    return {
      ...state,
      callState: {
        errorMsg: error
      }
    };
  });

  readonly setLoading = this.updater((state: EmpState) => {
    return {
      ...state,
      callState: LoadingState.LOADING
    };
  });

  readonly setLoaded = this.updater((state: EmpState) => {
    return {
      ...state,
      callState: LoadingState.LOADED
    };
  });

  readonly updateempList = this.updater((state: EmpState, newData: any[]) => {
    return {
      ...state,
      error: "",
      empList: newData // [...state.empList, newData[0]]
    };
  });

  readonly updateempId = this.updater((state: EmpState, empId: string) => {
    return {
      ...state,
      error: "",
      empId: empId
    };
  });



// EFFECTS

  readonly getEmpList = this.effect((PAYLOAD$: Observable<any>) =>
  {
     return PAYLOAD$.pipe(
       concatMap((PAYLOAD: any) => {        
         return this.empService.getEmpList(PAYLOAD).pipe(
           tapResponse(
             data => {
              this.updateempList(data);
             },
             (e: string) => this.updateError(e)
           ),
 
           catchError(() => EMPTY)
         );
       })
     );
   });


}





    

  
