import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PostService} from "../../service/post.service";
import {TinymceService} from "../../service/tinymce.service";
import {MatSnackBar} from "@angular/material";
import {ValidationErrorHandler} from "../../../shared/validation-error-handler";

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.scss']
})
export class WritePostComponent implements OnInit {


  editorSettings;
  postForm:FormGroup;

  constructor(
    private router:Router,
    private postService:PostService,
    private tinymce:TinymceService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit() {

    this.postForm=this.fb.group({
      title:['',[Validators.required,Validators.minLength(20),Validators.maxLength(100)]],
      body:['',[Validators.required,Validators.minLength(100)]]
    });

  }


  submit(){
    if (this.postForm.dirty && this.postForm.valid) {
      this.postService.addPost(this.postForm.value).subscribe(post=>{
        this.router.navigate(['/blog/posts',post.id]);
      },
      validationResult=>{
        this.snackBar.open('There are validation errors!','Close',{duration:300});
        ValidationErrorHandler.handleFormValidationErrors(this.postForm,validationResult);
      });
    }
  }

}
