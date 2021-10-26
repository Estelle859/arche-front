import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { Adresse } from 'src/app/interfaces/adresse';
import { Article } from 'src/app/interfaces/article';
import { Client } from 'src/app/interfaces/client';
import { Commande } from 'src/app/interfaces/commande';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { Lignecommande } from 'src/app/interfaces/lignecommande';
import { Panier } from 'src/app/interfaces/panier';
import { User } from 'src/app/interfaces/user';
import { ArticleService } from 'src/app/services/articles/article.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CommandeService } from 'src/app/services/commande/commande.service';
import { PanierService } from 'src/app/services/paniers/panier.service';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-valider-panier',
  templateUrl: './valider-panier.component.html',
  styleUrls: ['./valider-panier.component.css']
})
export class ValiderPanierComponent implements OnInit{

  public mode:number=0;
  panelStyle:string= "panel-default";  
 // public checkout : Lignecommande[] = [] ;
 public total :number = 0;
 // private article: Article = {} ;

 cartlist: Lignecommande[] =[] ;
  //private qteStock: any | undefined;
  public client: Client ={};
  public adresses: Adresse[]= [];
  //public client: Client = { nom: '', prenom:'', adresses: {rue:'', ville: '' ,codePostale:''},telephone:'',email:''} ;
  constructor( 
    private router: Router,
    public panierService: PanierService,    
    public commandeService: CommandeService,
    ) {
     
  }

  ngOnInit(): void {    
    this.client = JSON.parse(sessionStorage.getItem('authenticatedUser')||'');  
    this.adresses = this.client.adresses?? [];  
  }
  onSaveClient(client:Client) {
    client=JSON.parse(sessionStorage.getItem('authenticatedUser')||''); 
    this.commandeService.setClient(client); 
    this.commandeService.loadProductsFromCart();   
   // this.commandeService.getTotalOrder();
    this.total =  this.commandeService.getTotalOrder(); 
    this.commandeService.setTotal(this.total);
   // this.commandeService.setCheckout(this.checkout);
    this.mode=1;    
  }
 
  // loadProductsFromCart(){
  //   this.checkout=[];
  //   const keys = Object.keys(sessionStorage); 
  //   for( let i = 0; i<sessionStorage.length;i++){     
  //     console.log("KEYS",Object.keys(sessionStorage));   
  //     if(keys[i] == 'authenticatedUser'&&'mycart'){
  //       console.log("je suis user",i);
  //     }else{
  //       let session= sessionStorage.getItem( sessionStorage.key(i) ||"");   
  //       let lingneCommande!:Lignecommande; 
  //       lingneCommande = JSON.parse(session || "");
  //       this.checkout.push(lingneCommande);
  //       console.log("CHECKOUT",this.checkout)
  //     }
  //   }
  // }
  // checkQuantityAvailable(idArt:number,qteCmd:number){
    //   this.articleService.getArticleById(idArt)
    //     .subscribe(res => {
    //       this.article = res;
    //       this.qteStock = this.article.quantiteEnStock;
    //       console.log("ordered article and its qty in stock",this.article, this.qteStock)
    //       if(qteCmd <= this.qteStock){
    //           alert("ordered quantity is available in stock");       
           
    //       }else{
    //           alert("quantity not available, select lesser qty ");
            
    //       }        
    //     });
    // }
    // updateQuantity(inputId:number, event:any){
    //   this.panierService.updateQuantity(inputId,event);  
    // }
     // update items quantity in the cart
    // updateQuantity(id:any, quantity:any) {   
    //     this.cartlist.forEach(value => {
    //       let prix:any = value.prix?? [];
    //       let qty:any = value.qty?? [];
    //       this.totalSum = this.totalSum + (qty * prix);
    //     });     
    // }
    onOrder() {
      console.log("Commande::", this.commandeService.commande)
      this.commandeService.submitOrder().subscribe(res=>{
        console.log('[POST] create commande successfully', res);
        this.commandeService.commande.id=res['id'] ;
        this.commandeService.commande.dateCommande=res['dateCommande'];
        this.panelStyle="panel-success";
    },error => {
      alert('FAIL to create Commande!');
    },
    () => {
      alert('POST Commande - now completed.');
    });
    }
    onPayOrder() {
      //this.router.navigate(['/paiement/'+ +this.commandeService.commande.id)]);
     this.router.navigateByUrl("/paiement/"+this.commandeService.commande.id);
     console.log("payer pour ma commande",this.commandeService.commande.id);
    }
  
}
  
