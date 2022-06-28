import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserGroups } from '@core/models/user-group';
import { CoreService } from '@core/services/core.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public core: CoreService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.isJwtAuthenticated(next, url);
  }

  async isJwtAuthenticated(route: ActivatedRouteSnapshot, url: any): Promise<boolean> {
    var isuserAuthenticated = false;
    await this.core.isJwtAuthenticated().toPromise().then(
      res => {
        const parsedTokenData = this.core.parseJwt(localStorage.getItem('token'));
        var userGroup = "";
        userGroup = parsedTokenData.USERGROUP;
        switch (userGroup) {
          case UserGroups.Agent:
            isuserAuthenticated = route.data.role.includes(UserGroups.Agent);
            break;
          case UserGroups.Individual:
            isuserAuthenticated = route.data.role.includes(UserGroups.Individual);
            break;
          case UserGroups.Admin:
            isuserAuthenticated = route.data.role.includes(UserGroups.Admin);
            break;
          default:
            isuserAuthenticated = false;
            break;
        }
      }
    );
    return isuserAuthenticated;

  }
}
