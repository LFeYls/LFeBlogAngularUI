import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../shared/material/material.module";
import {BlogRoutingModule} from "./blog-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BlogComponent} from "./blog.component";
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [
    BlogComponent,
    SidenavComponent,
    ToolbarComponent
  ],

})
export class BlogModule { }
