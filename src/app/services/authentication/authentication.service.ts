import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = 'http://localhost:8080/api/user/';  
  public authenticated: boolean;
  public authenticatedUser: any;

  constructor(private http: HttpClient) {  
  } 

  login(userName: any, password: any) { 
    return  this.http.get<User>(this.url + userName +'/'+ password)  
    .pipe(map(user => { 
      console.log("USER from back", user)
      if(user)  {             
        this.authenticated = true;
        this.authenticatedUser = user;
        sessionStorage.setItem('authenticatedUser', JSON.stringify(this.authenticatedUser));
        console.log("CONNEXION OK");        
      } else{
        this.authenticated = false;    
        console.log("CONNEXION OK");         
      }  
      //return user;  
    }));      
  }
  loadUser(){
    let user=sessionStorage.getItem('authenticatedUser');
    if(user){
      this.authenticatedUser=JSON.parse(user);
      this.authenticated=true;
    }
  }

  isUserLoggedIn() {
  let user = sessionStorage.getItem('authenticatedUser');
   console.log("USER",!(user === null));
    return !(user === null);
    return this.authenticated;
  }

  logout() {  
    this.authenticated = false;
    this.authenticatedUser = undefined; 
    sessionStorage.removeItem('authenticatedUser');   
    console.log("user logged out!!");  
  }
  
}
