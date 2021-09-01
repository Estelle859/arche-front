import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from 'src/app/interfaces/commande';
import { User } from 'src/app/interfaces/user';
import { PanierService } from '../paniers/panier.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  public commande:Commande;

  constructor(private panierService : PanierService,
              private userService : UserService,
              private httpClient : HttpClient) { }
  public getUser(user:User){
    this.commande.user = user;
  }
  // public loadArticlesFromCart(){   
  //   for(let i in this.panierService.getArticlesCart){
  //     let session = sessionStorage.getItem(sessionStorage.key(i) ||"")
  //     lignePanier!=LignePanier;
  //     this.commande.push(lignePanier)
  //   }
  //  }

}
