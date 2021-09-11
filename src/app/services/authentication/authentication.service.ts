import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = 'http://localhost:8080/api/user/';  
  public authenticated: boolean;
  public authenticatedUser: any;

  constructor(private http: HttpClient, private router: Router) {  
  } 

  login(userName: any, password: any) {
    return  this.http.get<Client>(this.url + userName +'/'+ password)  
    .pipe(map(user => {
            if(!(user === null)){                
              this.authenticated=true;
              this.authenticatedUser=user;                  
              sessionStorage.setItem("authenticatedUser",JSON.stringify(this.authenticatedUser));              
            }else{
              this.authenticated=false;
              this.authenticatedUser=undefined;
            }
            return user;
          })); 
  }
  
  logout(){
    this.authenticated=false;
    this.authenticatedUser=undefined;
    // remove user from session storage to log user out
    sessionStorage.removeItem('authenticatedUser');
  }

  isAuthenticated(){
    return this.authenticated;
  }

  
}
