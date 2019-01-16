import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {OpenIdConnectService} from "./open-id-connect.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Injectable({
  providedIn: 'root'
})
export class RequireAuthenticatedUserRouteGuard implements CanActivate {

  constructor(
    private openIdConnectService:OpenIdConnectService,
    private router:Router
  ){

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.openIdConnectService.userAvilable) {
      return true;
    }else {
      this.openIdConnectService.triggerSignIn();
      return false;
    }
  }
}
