import { Injectable } from '@angular/core';
import {User, UserManager} from "oidc-client";
import {environment} from "../../../environments/environment";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OpenIdConnectService {

  private userManager:UserManager=new UserManager(environment.openIdConnectSettings);
  private currentUser:User;

  userLoaded$=new ReplaySubject<boolean>(1);

  get userAvilable():boolean{
    return this.currentUser!=null;
  };

  get user():User{
    return this.currentUser;
  }

  constructor(){
    this.userManager.events.addUserLoaded(user=>{
      if (!environment.production) {
        console.log('User loaded.',user);
      }
      this.currentUser=user;
      this.userLoaded$.next(true);
    });

    this.userManager.events.addUserUnloaded(e=>{
      if (!environment.production) {
        console.log('User unloaded');
      }

      this.currentUser=null;
      this.userLoaded$.next(false);
    });
  }


  triggerSignIn(){
    this.userManager.signinRedirect().then(()=>{
      if (!environment.production) {
        console.log('Redirection to signin triggered.');
      }
    });

  }


  handleSilentCallback(){
    this.userManager.signinRedirectCallback().then(user=>{
      this.currentUser=user;
      if (!environment.production) {
        console.log('Callback after silent signin handled.', user);
      }
    });
  }


  triggerSingOut(){
    this.userManager.signoutRedirect().then(resp=>{
      if (!environment.production) {
        console.log('Redirection to sing out triggered.',resp);
      }
    });
  }



}
