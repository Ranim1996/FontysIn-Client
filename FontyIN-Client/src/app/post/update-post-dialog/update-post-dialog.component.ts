import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostsService } from 'src/app/services/posts.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';


export interface Post {
  content: string;
  date: string;
  id: number;
  userId: number;
  image: string;
}

@Component({
  selector: 'app-update-post-dialog',
  templateUrl: './update-post-dialog.component.html',
  styleUrls: ['./update-post-dialog.component.css']
})
export class UpdatePostDialogComponent implements OnInit {

  constructor(private postService: PostsService,private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatePostDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

    postId = 0;
  post: Post;
  newContent: String;
  data1 = {};
  uploadForm: FormGroup;
  postUrl : string;

  saveVal(item){
    this.newContent = item.target.value;
    console.log(this.newContent);
  }

  updatePost(){

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    
   this.postService.uploadPicture(localStorage.getItem("userId"), formData).subscribe((data)=>
   { 
    
       this.postUrl =<string> data;
       console.log("data");
    console.log(this.postUrl);
       
   });

    console.log(this.lenImg());
    if(this.lenImg()){
      this.data = {
        "content": this.newContent,
        "date": this.post.date,
        "id": this.post?.id,
        "userId": localStorage.getItem("userId"),
        "image": "assets/"+localStorage.getItem("userId")+this.uploadForm.get('profile').value.name
        };
    } else{
      this.data = {
        "content": this.newContent,
        "date": this.post.date,
        "id": this.post?.id,
        "userId": localStorage.getItem("userId"),
        "image": this.post?.image
        };
    }
    console.log(this.data);
    console.log(this.postId);
    this.postService.updatePost(<JSON>this.data,this.post?.id);
    
     
    
  }
  CloseDialog(){
    this.dialogRef.close();
  }

  lenImg(){
    if(this.postUrl?.length >0){
      return true;
    } else {
      return false;
    }
  }

  closeImg(){
    this.postUrl = "";
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);

      
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.postUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    this.post.image = "";
    
  }


  ngOnInit(): void {
   
    this.post = this.data.p;
    this.newContent = this.post.content;
    console.log(this.post);
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

}
