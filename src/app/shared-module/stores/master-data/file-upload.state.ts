import { Injectable } from "@angular/core";

import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { createFileuploadModel } from "@shared/models/doc-upload.model";
import { MasterDataLookUpTypes } from "@shared/models/master.models";
import { FileuploadService } from "@shared/services/fileupload.service";
import { MasterdataService } from "@shared/services/masterdata.service";
import * as _ from "lodash";
import { catchError, concatMap, EMPTY, Observable } from "rxjs";

export const enum LoadingState {
    INIT = "INIT",
    LOADING = "LOADING",
    LOADED = "LOADED"
}
export interface ErrorState {
    errorMsg: string;
}

export type CallState = LoadingState | ErrorState;


interface FileUploadState {   
    groupId: string; 
    fileList:any[];             
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
export class FileUploadStoreService extends ComponentStore<FileUploadState> {
    constructor(private uploadService: FileuploadService) {
        super({
            groupId:null,
            fileList: [],                        
            callState: LoadingState.INIT,
            executed: false,
        });
    }

    public activeGroupId: string = null;

    // SELECTORS
    private readonly groupId$: Observable<string> = this.select(state => state.groupId);

    private readonly fileList$: Observable<any[]> = this.select(state => state.fileList);
    private readonly callState$: Observable<any> = this.select(state => state.callState);
    
    private readonly loading$: Observable<boolean> = this.select(
        state => state.callState === LoadingState.LOADING
    );
    private readonly error$: Observable<string> = this.select(state =>
        getError(state.callState)
    );


    // ViewModel for the component
    readonly vm$ = this.select(
        this.groupId$,
        this.fileList$,        
        this.loading$,
        this.error$,
        this.callState$,        
        (groupId, fileList,loading, error, callState) => ({
          groupId,
          fileList,          
            loading,           
            error,  
            callState,                    
        })
    );


// UPDATERS
  readonly updateError = this.updater((state: FileUploadState, error: string) => {
    return {
      ...state,
      callState: {
        errorMsg: error
      }
    };
  });

  readonly setLoading = this.updater((state: FileUploadState) => {
    return {
      ...state,
      callState: LoadingState.LOADING
    };
  });

  readonly setLoaded = this.updater((state: FileUploadState) => {
    return {
      ...state,
      callState: LoadingState.LOADED
    };
  });

  readonly updateFileList = this.updater((state: FileUploadState, newData: any[]) => {
    return {
      ...state,
      error: "",
      fileList: newData // [...state.fileList, newData[0]]
    };
  });

  readonly updateGroupid = this.updater((state: FileUploadState, groupid: string) => {
    return {
      ...state,
      error: "",
      groupId: groupid
    };
  });



// EFFECTS


  readonly upoloadfile = this.effect((ITEM$: Observable<any>) =>
 {
    return ITEM$.pipe(
      concatMap((ITEM: any) => {        
        ITEM.append("groupId", this.activeGroupId); 

        return this.uploadService.uploadAndGetgroupid(ITEM).pipe(
          tapResponse(
            data => {
              this.activeGroupId = data?.data?.groupId;
              if(this.activeGroupId){
              this.updateGroupid(this.activeGroupId);
              }
            },
            (e: string) => this.updateError(e)
          ),

          catchError(() => EMPTY)
        );
      })
    );
  });





  readonly getFiles = this.effect((GRUOPID$: Observable<any>) =>
  {
     return GRUOPID$.pipe(
       concatMap((GRUOPID: any) => {        
         return this.uploadService.getFileDetails(GRUOPID).pipe(
           tapResponse(
             data => {
              this.updateFileList(data?.data);
             },
             (e: string) => this.updateError(e)
           ),
 
           catchError(() => EMPTY)
         );
       })
     );
   });


   readonly deleteFiles = this.effect((FILE$: Observable<any>) =>
   {
      return FILE$.pipe(
        concatMap((FILE: any) => {        
          return this.uploadService.deleteFiles(FILE).pipe(
            tapResponse(
              data => {
               this.getFiles(this.activeGroupId);
              },
              (e: string) => this.updateError(e)
            ),
  
            catchError(() => EMPTY)
          );
        })
      );
    });

}





    

  
