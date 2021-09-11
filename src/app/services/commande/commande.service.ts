import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from 'src/app/interfaces/commande';
import { Panier } from 'src/app/interfaces/panier';
import { Client } from 'src/app/interfaces/client';
import { PanierService } from '../paniers/panier.service';
import { UserService } from '../user/user.service';
import { Article } from 'src/app/interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  public commande:Commande={};

  
  urlCom = 'http://localhost:8080/api/commande/';
  urlCli = 'http://localhost:8080/api/client/';

  constructor(private panierService : PanierService,
              private userService : UserService,
              private httpClient : HttpClient) { }

  public getClient(){
    return this.commande.client ;
  }
 
  public setClient(client:Client){
    this.commande.client=client;  
  }
  public setDate(){
    this.commande.dateCommande=new Date();  
  }
 
  public loadProductsFromCart(){ 
    this.commande.lignecommandes=[];

   for(let key in this.panierService.getCart().lPaniers){     
     let cart :any = this.panierService.getCart()?? []; 
     this.commande.lignecommandes.push(cart.lPaniers[key]);
     this.commande.id = cart.lPaniers[key].article.id;
     console.log(this.commande.id);
     console.log("loadingproducts from cart",this.commande.lignecommandes)
   }
   
  }
  public setPrixTotal(tot:number){
    this.commande.prixTotal=tot;  
  }

  // public loadProductsFromCart(){  
  //   this.commande.lignecommandes=[]; 
  //   let cartItems:Panier [] = [];  
  //   let cart = this.panierService.getCart();
  //   console.log("cart from panierservice***", cart);
  //   cartItems.push(cart);
  //   console.log("cartItems***", cartItems);
  //   for(let key in cartItems){      
  //     this.commande.lignecommandes.push(cartItems[key]);
  //   }      
  //   console.log("this.commande.lignecommandes***", this.commande.client);
  //   console.log("this.commande.lignecommandes***", this.commande.lignecommandes);
  //   console.log("this.commande.lignecommandes***", this.commande);
  //   console.log("this.commande.lignecommandes***", this.commande.prixTotal);
  // }

  submitOrder() {  
    console.log("order goes to back end ",this.commande);    
    return this.httpClient.post(this.urlCom,this.commande);
  }

  public getOrder(id:number):Observable<Commande>{
    return this.httpClient.get<Commande>(this.urlCom+"commande/"+id);
  }

  public getTotalOrder():number{
    let total:any=0;
    this.commande?.lignecommandes?.forEach(p=>{
      let prix:any = p.prix?? [];
      let qty:any = p.qty?? [];
      total+=prix * qty;
    });
     return total;
  }

}
