import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, concatMap, finalize, take } from 'rxjs/operators';
import { CoreService } from '@core/services/core.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshingToken = false;

  private tokenRefreshed$ = new BehaviorSubject<boolean>(false);

  private user;

  constructor(public core: CoreService) {
    this.user=core.getSession();
   }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {     
    return next.handle(this.addToken(request)).pipe(
      catchError(err => {
        if (err.status === 401 && this.user.refreshToken) {
          return this.handle401Error(request, next);
        }
        return throwError(err);
      })
    );
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {  
    this.user=this.core.getSession();
    return this.user ? req.clone({ setHeaders: { Authorization: 'Bearer ' + this.user.token } }) : req;
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.isRefreshingToken) {
      return this.tokenRefreshed$.pipe(
        take(1),
        concatMap(() => next.handle(this.addToken(req)))
      );
    }

    this.isRefreshingToken = true;

    // Reset here so that the following requests wait until the token
    // comes back from the refreshToken call.
    this.tokenRefreshed$.next(false);

    return this.core.refreshToken().pipe(
      concatMap((res: any) => {

        this.tokenRefreshed$.next(true);
        return next.handle(this.addToken(req));
      }),
      catchError((err) => {
        this.core.logout();
        return throwError(err);
      }),
      finalize(() => {
        this.isRefreshingToken = false;
      })
    );
  }

}