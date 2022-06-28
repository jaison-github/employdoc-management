import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIURL } from '@shared/constants/app-constants';
import { NotificationService } from '@shared/services/notification.service';
import * as moment from 'moment';
import {
  catchError,
  map,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any;
  private userGroup: string[] = [];
  private expiresAt: any;

  constructor(
    private http: HttpClient,
    private route: Router,
    private notify: NotificationService
  ) {}

  public defaultUrl = '/dashboard';

  public login(credentials: any): Observable<any> {
    // this.clearSession();
    return this.http.post(APIURL.loginapiUrl, credentials).pipe(
      tap((authData) => this.handleLoginData(authData)),
      map((data: any) => {
        //  alert('Login Success');
        return data.data;
      }),
      catchError((error) => {
        return throwError(
          error?.error?.msg || 'Something went wrong. Please ty again.'
        );
      }),
      shareReplay()
    );
  }
  public logOut(): void {
  
  }
  public handleLoginData(authResult): void {
    const data = authResult.data;
    var oldDateObj = new Date();
    var newDateObj = new Date();
    this.expiresAt = newDateObj.setTime(oldDateObj.getTime() + 30 * 60 * 1000);
  }

  public get isTokenExpired(): boolean {
    return !this.expiresAt || this.expiresAt.isBefore(moment());
  }
}
