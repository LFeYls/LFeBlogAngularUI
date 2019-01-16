import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../shared/material/material.module";
import {BlogRoutingModule} from "./blog-routing.module";
import {BlogComponent} from "./blog.component";
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PostTableComponent } from './components/post-table/post-table.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { WritePostComponent } from './components/write-post/write-post.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditorModule} from "@tinymce/tinymce-angular";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SafeHtmlPipe} from "../shared/safe-html.pipe";
import {PostService} from "./service/post.service";
import {TinymceService} from "./service/tinymce.service";
import {AuthorizationHeaderInterceptor} from "../shared/oidc/authorization-header-interceptor.interceptor";
import {EnsureAcceptHeaderInterceptor} from "../shared/ensure-accept-header.interceptor";
import {HandleHttpErrorInterceptor} from "../shared/handle-http-error-interceptor";

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    InfiniteScrollModule,
    MaterialModule
  ],
  declarations: [
    BlogComponent,
    SidenavComponent,
    ToolbarComponent,
    PostTableComponent,
    EditPostComponent,
    PostCardComponent,
    PostListComponent,
    WritePostComponent,
    SafeHtmlPipe
  ],
  providers:[
    PostService,
    TinymceService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthorizationHeaderInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:EnsureAcceptHeaderInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HandleHttpErrorInterceptor,
      multi:true,
    }
  ]

})
export class BlogModule { }
