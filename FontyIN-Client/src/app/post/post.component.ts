import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PostsService} from '../services/posts.service';
import { Moment } from 'moment';
import { User } from '../classes/Profile/User';
import { ProfileService } from '../services/profile/profile.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UpdatePostDialogComponent } from './update-post-dialog/update-post-dialog.component';

export interface Post {
  content: string;
  date: string;
  id: number;
  userId: number;
  image: string;
}
export interface Like {
  id: number;
  postId: number;
  userId: number;
}
export interface Comment {
  content: string;
  date: string;
  id: number;
  userId: number;
  postId: number;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()  post : Post;
  checked: boolean;
  comments: Comment[];
  userId :number = +localStorage.getItem("userId");
  @Input() id ;
  constructor( private postService: PostsService, private profileService: ProfileService,private router: Router,public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }
  data = {};
  content : String;
  commentContent : String;
  commentData = {};
  likeData = {};
  time : Moment;
  user: User;
  likeCount = 0;
  userLikeOnPost : Like;
  wasClicked = true;
  clicked = false;

 

  getUserById(id){
    user: User;
    this.profileService.getUser(this.post.userId)
    .subscribe((data)=>
    {
     
      return <User>data;

    });

  }

  createComment(id) {
    this.commentData = {
      "content": this.commentContent,
      "id": 0,
      "postId": id,
      "userId": localStorage.getItem("userId")
      };
    this.postService.newComment(<JSON>this.commentData);
    // window.location.reload();
    
  }

  checkIds(){
    console.log("compare to ids");
    console.log(this.userId);
    console.log( this.post?.userId);
    if( this.userId == this.post?.userId){
      this.checked = true;
    } else {
      this.checked = false;
    }
    console.log(this.checked);
  }

  createPost() {
    this.data = {
      "content": this.content,
      "id": 5,
      "userId": localStorage.getItem("userId")
      };
    this.postService.newPost(<JSON>this.data);
    window.location.reload()
  }

  deletePost(id){
    this.postService.deletePost(id);
    window.location.reload()
  }

  likePost(){
    this.likeData = {
      "id":1,
      "likerId": localStorage.getItem("userId"),
      "postId": this.id
    }
    this.postService.newLikeOnPost(this.id,this.likeData);
    this.likeCount += 1;
    
  }

  openUpdateDialog(){
    const dialogRef = this.dialog.open(UpdatePostDialogComponent, {
      width: '50%',
      data: {p: this.post},
      panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']
  
    }); 
    dialogRef.afterClosed();
  }

  ngOnInit(): void {
    this.postService.getPostLikesCount(this.id)
    .subscribe((data)=>
    {
      
      this.likeCount=<number>data;

    });
    this.postService.getPostLikeByUser(this.id,localStorage.getItem("userId"))
     .subscribe((data)=>{
     console.log(data);
      this.userLikeOnPost = <Like>data;
   });
   this.checkIds();
   this.postService.getCommentsByPostId(this.id)
   .subscribe((data)=>{
   console.log(data);
    this.comments = <Comment[]>data;
    });
    this.profileService.getUser(this.post.userId)
    .subscribe((data)=>
    {
      console.log(data);
      this.user=<User>data;

    });
    
  }

}
