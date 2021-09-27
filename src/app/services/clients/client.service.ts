import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adresse } from 'src/app/interfaces/adresse';
import { Client } from 'src/app/interfaces/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = 'http://localhost:8080/api/client/';
  constructor(private http: HttpClient) {
  }
  
  public getAllClients(): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(this.url +'all');
  } 
  public getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(this.url + id);
  } 
  updateClient (id : number, nom : string, prenom: string, motdepasse : string, email : string, telephone:string, adresses : Adresse, phone : string) : Observable<Client> {
    return this.http.put<Client>(this.url + id, {
        nom,
        prenom,
        email,
        motdepasse,
        telephone,
        adresses
     
    })
  }
  deleteClient  (id : number) : Observable<any> {
    return this.http.delete(this.url + id,);
  }


}
