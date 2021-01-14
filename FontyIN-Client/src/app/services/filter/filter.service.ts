import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  readLocalStorageValue() {
    if(localStorage.getItem("userToken") != null){
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization',localStorage.getItem("userToken"));
    };
}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) {this.readLocalStorageValue(); }

  public filterByUserType(userType){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?type=' + userType, this.httpOptions);
  }

  public filterUsersByStartStudyYear(year){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?studyYear=' + year, this.httpOptions);
  }

  public filterUserByLocation(location){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?location=' + location, this.httpOptions);
  }

  public filterUserByDepartment(department){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?department=' + department, this.httpOptions);
  }

  public filterUsersByStartWorkYear(year){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?workingYear=' + year, this.httpOptions);
  }

  public filterUsersByName(name){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?firstName=' + name, this.httpOptions);
  }

  public filterUsersByTypeLocationDepartment(type, locId, depId){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?type=' + type + '&location=' + locId + '&department=' + depId, this.httpOptions);
  }

  public filterUsersByTypeLocationDepartmentStudyYear(type, year, locId, depId){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?type=' + type + '&studyYear=' + year + '&location=' + locId + '&department=' + depId, this.httpOptions );
  }

  public filterUsersByTypeLocationDepartmentWorkYearFontysStaff(type, year, locId, depId){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?type=' + type + '&workingYear=' + year + '&location=' + locId + '&department=' + depId, this.httpOptions );
  }

  public filterUsersByTypeLocationDepartmentName(name, locId, depId, type){
    return this.httpClient.get('https://fontysin-backend.azurewebsites.net/users?firstName=' + name + '&location=' + locId + '&department=' + depId + '&type=' + type, this.httpOptions);
  }

}
