import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from 'src/app/interfaces/commande';
import { Panier } from 'src/app/interfaces/panier';
import { Client } from 'src/app/interfaces/client';
import { PanierService } from '../paniers/panier.service';
import { UserService } from '../user/user.service';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from '../articles/article.service';
import { Lignecommande } from 'src/app/interfaces/lignecommande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  public commande:Commande={};
  public article: Article = {} ;
 // public qteStock: any | undefined;
 public totalPrix:any | undefined;
 qteStock:any | undefined;
 confirmeOk : boolean = true;
  //public checkout : Lignecommande[] = [] ;
  
  urlCom = 'http://localhost:8080/api/commande/';
  //private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  urlCli = 'http://localhost:8080/api/client/';
  http: any;
  

  constructor(private panierService : PanierService,
              private articleService : ArticleService,
              private httpClient : HttpClient) { }

  // public getClient(){
  //   return this.commande.client ;
  // }
 
  public setClient(client:Client){
    this.commande.client=client;  
  }
  public setTotal(total:number){
    this.commande.prixTotal=this.totalPrix;  
  }
  // public setCheckout(checkout:Lignecommande[]){
  //   this.commande.lignecommandes=this.checkout; 
 
  // }
 
  public loadProductsFromCart(){ 
  this.commande.ligneCommandes=[];
  for(let key in this.panierService.getCart().lPaniers){     
     let cart :any = this.panierService.getCart()?? [];
     this.commande.ligneCommandes.push(cart.lPaniers[key]);   
      console.log("loading products from cart",this.commande.ligneCommandes)
  }
  //this.checkout = this.commande.ligneCommandes;
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

  submitOrder():Observable<Commande> {  
    console.log("order goes to back end ",this.commande);   
    return this.httpClient.post<Commande>(this.urlCom+`add`,this.commande);    
    //return this.httpClient.post(this.urlCom,this.commande,{ headers: this.headers });
  }

  public getOrder(id:number):Observable<Commande>{
    console.log("commande numero", id);
    return this.httpClient.get<Commande>(this.urlCom+id);
  
  }

  public getTotalOrder():number{
    let total:any=0;
    this.commande?.ligneCommandes?.forEach(p=>{
      let prix:any = p.prixUnitaire?? [];
      let qty:any = p.quantiteCommande?? [];
      total+=prix * qty;
    });
   this.totalPrix = total;
    return total;
  }

  checkQuantityAvailable():boolean {  
    this.commande?.ligneCommandes?.forEach(lc=>{
      let idArticle:any = lc.article?.id;      
      let quantiteCommande:any = lc.quantiteCommande;
      let quantiteStock:any = lc.article?.quantiteEnStock;
      if(quantiteCommande <= quantiteStock){
        alert("ordered quantity is available in stock"+idArticle); 
        let qty = quantiteStock -quantiteCommande;  
        this.articleService.updateArticleStock(idArticle,qty).subscribe(
          data => {
              console.log("DATA article RETURNED FROM BACK",data)   ;             
          },
          error => {
              alert("error");            
          });
        this.confirmeOk=true;
      }else{
        alert("quantity not available, select lesser qty " +idArticle);
        this.confirmeOk=false;
      }      
    });  
    console.log("ordered article and its qty in stock",this.article, this.qteStock); 
    return this.confirmeOk;
 
  }

  public addPaiement(info: Object): Observable<Object> {
    return this.httpClient.post<Commande>(this.urlCom+`paie`,this.commande); 
  }

}