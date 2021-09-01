import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
 
    router: any;
    url = 'http://localhost:8080/api/user/';

    constructor(private http: HttpClient) { 
    } 

    public getUser(): Observable<User> {
      return this.http.get<User>(this.url + 'getUser');
    } 
    getAll() {
      return this.http.get<User[]>(this.url +'all');
    }

    delete(id: number) {
        return this.http.delete(this.url +id);
    }  

    register(user: User) {
      console.log("registraion done");
        return this.http.post(this.url +`/add`, user);
    }  

  
}
