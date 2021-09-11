import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {  
 
    router: any;
    url = 'http://localhost:8080/api/client/';

    constructor(private http: HttpClient) { 
    } 

    public getUser(): Observable<Client> {
      return this.http.get<Client>(this.url + 'getUser');
    } 
    getAll() {
      return this.http.get<Client[]>(this.url +'all');
    }

    delete(id: number) {
        return this.http.delete(this.url +id);
    }  

    register(user: Client) {
      console.log("registraion done");
        return this.http.post(this.url +`add`, user);
    }  

  

  
}
