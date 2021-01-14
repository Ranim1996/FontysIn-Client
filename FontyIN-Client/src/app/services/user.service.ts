import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {  this.readLocalStorageValue(); }

  readLocalStorageValue() {
    if(localStorage.getItem("userToken") != null){
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization',  localStorage.getItem("userToken"));
    };
}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  
  login(email, password){
   
    const body = email+":"+password;
    return this.httpClient.post('https://fontysin-backend.azurewebsites.net/users/login', body, {responseType: 'text'});
   }
 
   logout(){
     this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
   }
   getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  getUserIdOfLoggedIn(){
    var decoded = this.getDecodedAccessToken(localStorage.getItem("userToken"))
    var userId = decoded['jti'];
    return userId;
  }
 

}
