import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";
import {PageMeta} from "../../../shared/models/page-meta";
import {PostParameters} from "../../models/post-parameters";
import {PostService} from "../../service/post.service";
import {OpenIdConnectService} from "../../../shared/oidc/open-id-connect.service";
import {ResultWithLinks} from "../../../shared/models/result-with-links";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {


  posts:Post[];
  pageMeta:PageMeta;
  postParameter =new PostParameters({orderBy:'id desc',pageSize:10,pageIndex:0});


  constructor(
    private postService:PostService,
    private openIdConnectService:OpenIdConnectService
  ) { }

  ngOnInit() {
    this.posts=[];
    this.getPosts();
  }

  getPosts(){
    this.postService.getPagedPosts(this.postParameter).subscribe(resp=>{
      this.pageMeta=JSON.parse(resp.headers.get('X-pagination')) as PageMeta;
      const result={...resp.body} as ResultWithLinks<Post>;
      this.posts=this.posts.concat(result.value);
    });
  }

  onScroll(){
    console.log('scrolled down!!');

    this.postParameter.pageIndex++;
    if (this.postParameter.pageIndex<this.pageMeta.pageCount){
      this.getPosts();
    }
  }

}
