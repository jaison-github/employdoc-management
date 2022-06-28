import { Injectable } from "@angular/core";

import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { MasterDataLookUpTypes } from "@shared/models/master.models";
import { MasterdataService } from "@shared/services/masterdata.service";
import { catchError, concatMap, EMPTY, Observable, of } from "rxjs";

export const enum LoadingState {
    INIT = "INIT",
    LOADING = "LOADING",
    LOADED = "LOADED"
}
export interface ErrorState {
    errorMsg: string;
}

export type CallState = LoadingState | ErrorState;


interface UserDataState {   
    user: any; 
    callState: CallState;
}

// Utility function to extract the error from the state
function getError(callState: CallState): LoadingState | string | null {
    if ((callState as ErrorState).errorMsg !== undefined) {
        return (callState as ErrorState).errorMsg;
    }

    return null;
}
@Injectable()
export class UserInfoStoreService extends ComponentStore<UserDataState> {
    constructor(private masterService: MasterdataService) {
        super({
            user: null,          
            callState: LoadingState.INIT,
        });
    }

    // SELECTORS
    private readonly user$: Observable<any[]> = this.select(state => state.user);
    private readonly loading$: Observable<boolean> = this.select(
        state => state.callState === LoadingState.LOADING
    );
    private readonly error$: Observable<string> = this.select(state =>
        getError(state.callState)
    );


    // ViewModel for the component
    readonly vm$ = this.select(
        this.user$,   
        this.loading$,
        this.error$,        
        (user, loading, error,) => ({
            user,
            loading,           
            error,                      
        })
    );


// UPDATERS
  readonly updateError = this.updater((state: UserDataState, error: string) => {
    return {
      ...state,
      callState: {
        errorMsg: error
      }
    };
  });

  readonly setLoading = this.updater((state: UserDataState) => {
    return {
      ...state,
      callState: LoadingState.LOADING
    };
  });

  readonly setLoaded = this.updater((state: UserDataState) => {
    return {
      ...state,
      callState: LoadingState.LOADED
    };
  });

  readonly updateUser = this.updater((state: UserDataState, _userinfo: any[]) => {
    return {
      ...state,
      error: "",
      user: [...state.user, _userinfo]
    };
  });

    


// EFFECTS
readonly updateuserInfo = this.effect((data$: Observable<any>) => {
    return data$.pipe(
     // this.updateUser(data$);
     concatMap((data: any) => {
      return of(this.updateUser(data))
     })
   


      // concatMap((KEY: string) => {
      //   this.setLoading();
      //   return this.masterService.getMasterdata(KEY).pipe(
      //     tapResponse(
      //       data => {
      //         this.setLoaded();
      //         this.updateGenderlist(data);
      //       },
      //       (e: string) => this.updateError(e)
      //     ),

      //     catchError(() => EMPTY)
      //   );
      // })
    
  )});
}

    

  
