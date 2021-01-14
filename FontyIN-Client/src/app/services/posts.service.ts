import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { this.readLocalStorageValue(); }
  readLocalStorageValue() {
    if(localStorage.getItem("userToken") != null){
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem("userToken"));
    };
}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public getPosts(){
   return this.httpClient.get('https://fontysin-backend.azurewebsites.net/posts/user/'+ 1, this.httpOptions);
  }

  public getPostLikes(id){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/posts/'+id+"/likes", this.httpOptions);
   } 

  public newLikeOnPost(id,data){
    return this.httpClient.post('https://fontysin-backend.azurewebsites.net/posts/'+id+"/likes", data, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
  }
   public getPostLikeByUser(id,userid){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/posts/'+id+"/likes/user/"+userid, this.httpOptions);
   }
  public getPostLikesCount(id){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/posts/'+id+"/likes/count", this.httpOptions);
   }

  public getNewsfeed(id){
    return this.httpClient.get('http://localhost:9090/posts/newsfeed/'+id,this.httpOptions);
   }

  public getPost(id){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/posts/'+id, this.httpOptions);
   }

  public newPost(data){
    return this.httpClient.post('https://fontysin-backend.azurewebsites.net/posts', data, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
    
  }

  public updatePost(data,id){
    return this.httpClient.put('https://fontysin-backend.azurewebsites.net/posts/'+id, data, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
    
  }

  public deletePost(id){
    return this.httpClient.delete('https://fontysin-backend.azurewebsites.net/posts/'+id, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
  }

  public getCommentsByPostId(id){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/comments/post/'+id, this.httpOptions);
  }
  
  public uploadPicture(userId, data){
    return this.httpClient.put('https://fontysin-backend.azurewebsites.net/posts/'+userId+'/uploadPicture', data, {responseType: 'text'})
  }

  public newComment(data){
    return this.httpClient.post('https://fontysin-backend.azurewebsites.net/comments', data, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
    
  }
  
}
