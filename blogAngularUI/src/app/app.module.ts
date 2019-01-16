import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { RedirectSilentRenewComponent } from './shared/oidc/redirect-silent-renew/redirect-silent-renew.component';
import { SigninOidcComponent } from './shared/oidc/signin-oidc/signin-oidc.component';
import { SafeHtmlPipe } from './shared/safe-html.pipe';
import {OpenIdConnectService} from "./shared/oidc/open-id-connect.service";
import {RequireAuthenticatedUserRouteGuard} from "./shared/oidc/require-authenticated-user-route.guard";
import {GlobalErrorHandler} from "./shared/global-error-handler";
import {ErrorLoggerService} from "./shared/error-logger.service";

const routes:Routes=[
  { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
  { path: '**', redirectTo: 'blog' }
];


@NgModule({
  declarations: [
    AppComponent,
    RedirectSilentRenewComponent,
    SigninOidcComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    OpenIdConnectService,
    RequireAuthenticatedUserRouteGuard,
    GlobalErrorHandler,
    ErrorLoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
