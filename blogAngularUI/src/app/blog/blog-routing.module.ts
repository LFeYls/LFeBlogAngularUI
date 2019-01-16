import {NgModule} from "@angular/core";
import {MaterialModule} from "../shared/material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {BlogComponent} from "./blog.component";
import {PostListComponent} from "./components/post-list/post-list.component";
import {PostTableComponent} from "./components/post-table/post-table.component";
import {WritePostComponent} from "./components/write-post/write-post.component";
import {RequireAuthenticatedUserRouteGuard} from "../shared/oidc/require-authenticated-user-route.guard";
import {EditPostComponent} from "./components/edit-post/edit-post.component";


const routes:Routes=[
  {path: '', component: BlogComponent,
    children:[
      { path: 'post-list', component: PostListComponent },
      { path: 'post-table', component: PostTableComponent },
      {
        path: 'write-post', component: WritePostComponent,
        canActivate: [RequireAuthenticatedUserRouteGuard]
      },
      {
        path: 'edit-post/:id', component: EditPostComponent,
        canActivate: [RequireAuthenticatedUserRouteGuard]
      },
      // { path: 'post-detail/:id', component: PostDetailComponent },
      { path: '**', redirectTo: 'post-list'}
    ]
  }
];


@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BlogRoutingModule {

}
