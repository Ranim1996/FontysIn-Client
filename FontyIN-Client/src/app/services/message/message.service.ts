import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageService extends DataService {
  // logged in user id
  loggedInUserId = localStorage.getItem('userId');

  constructor(http: HttpClient) {
    super('http://localhost:9090/users/' + localStorage.getItem('userId') + '/messages', http);
  }

  //delete conversation in messaging page
  public deleteConversation(userId, conversationId){
    userId = this.loggedInUserId;
    return this.http.delete('http://localhost:9090/users/1/messages/user/' + userId + '/conversation/' + conversationId);
  }
}
