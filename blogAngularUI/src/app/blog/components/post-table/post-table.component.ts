import {Component, OnInit, ViewChild} from '@angular/core';
import {PageMeta} from "../../../shared/models/page-meta";
import {PostParameters} from "../../models/post-parameters";
import {Post} from "../../models/post";
import {Subject} from "rxjs";
import {MatPaginator, MatSort, PageEvent, Sort} from "@angular/material";
import {PostService} from "../../service/post.service";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {ResultWithLinks} from "../../../shared/models/result-with-links";

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit {


  pageMeta:PageMeta;
  postParameter  =new PostParameters({orderBy:'id desc',pageSize:10 ,pageIndex:0});

  displayedColumns:string[]=['id','title','author','lastModified'];
  dataSource:Post[];

  searchKeyUp=new Subject<string>();

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(
    private postService:PostService
  ) {
    const subscription = this.searchKeyUp.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(()=>{
      this.load();
    });
  }

  ngOnInit() {
    this.load();
  }

  load(){
    this.postService.getPagedPosts(this.postParameter).subscribe(resp=>{
      this.pageMeta= JSON.parse(resp.headers.get('X-Pagination')) as PageMeta;
      const pagedResult= {...resp.body} as ResultWithLinks<Post>;
      this.dataSource=pagedResult.value;
    })
  }

  applyFilter(filterValue:string){
    filterValue = filterValue.trim().toLowerCase();

    this.postParameter.title=filterValue;
    this.load();
  }

  sortData(sort:Sort){
    this.postParameter.orderBy=null;
    if (sort.direction){
      this.postParameter.orderBy=sort.active;
      if (sort.direction){
        this.postParameter.orderBy+='desc';
      }
    }

    this.load();

  }


  onPaging(pageEvent:PageEvent){
    this.postParameter.pageIndex= pageEvent.pageIndex;
    this.postParameter.pageSize=pageEvent.pageSize;

    this.load();
  }

}
