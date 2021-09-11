import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
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
  public client:Client;
  public checkout : Lignecommande[] = [] ;
  public total :number = 0;
  private article: Article = {} ;
  private qteStock: any | undefined;

  constructor( 
    private authService: AuthenticationService,
    private router: Router,
    public panierService: PanierService,
    private articleService: ArticleService,
    public commandeService: CommandeService,
    ) {
     
  }
  ngOnDestroy(){
   
  }

  ngOnInit(): void {    
    this.client = JSON.parse(sessionStorage.getItem('authenticatedUser')||'');     

  }
  onSaveClient(client:Client) {
    client=JSON.parse(sessionStorage.getItem('authenticatedUser')||''); 
   // this.checkout = this.panierService.getArticlesCart(); 
   // this.total = this.getTotal();    
    this.commandeService.setClient(client); 
    this.commandeService.setDate();
    //this.panierService.setClient(client);      
    //this.commandeService.loadProductsFromCart();
    // this.total = this.commandeService.getTotalOrder();   
    this.loadProductsFromCart();
    this.total = this.getTotal();
    this.commandeService.setPrixTotal(this.total);   
    this.mode=1;
    
  }
  loadProductsFromCart(){
    this.checkout=[];
    const keys = Object.keys(sessionStorage); 
    for( let i = 0; i<sessionStorage.length;i++){     
      console.log("KEYS",Object.keys(sessionStorage));      
   
      if(keys[i] == 'authenticatedUser'&&'mycart'){
        console.log("je suis user",i);
      }else{
        let session= sessionStorage.getItem( sessionStorage.key(i) ||"");   
        let lingneCommande!:Lignecommande; 
        lingneCommande = JSON.parse(session || "");
        this.checkout.push(lingneCommande);
      }
    }
    // for(let key in this.panierService.getCart().lPaniers){     
    //   let cart :any = this.panierService.getCart()?? []; 
    //   this.checkout.push(cart.lPaniers[key]);
    //   console.log("loadingproducts from cart",this.checkout)
    // }
  }
  getTotal(){
    var qty:number;
    var prix:number;
    var tot:number = 0;
    for( let i = 0; i<sessionStorage.length;i++){
      let session= sessionStorage.getItem( sessionStorage.key(i) ||"");     
      let lineCart!:LignePanier; 
      lineCart = JSON.parse(session || "");
      const str_qty =  JSON.parse(session || "").qty;   
      const str_article =  JSON.parse(session || "").article;
      const id: any | undefined =  JSON.parse(session || "").article?.id;
      if (str_qty == null || str_qty == "null"){  
        tot = 0;
      } else {
        qty = parseInt(str_qty);  
        prix = parseFloat(str_article.prixUnitaire);
        tot =  tot + (qty *prix) ;      
      }    
    }
    return tot;    
    }

    checkQuantityAvailable(idArt:number,qteCmd:number){
      this.articleService.getArticleById(idArt)
        .subscribe(res => {
          this.article = res;
          this.qteStock = this.article.quantiteEnStock;
          console.log("ordered article and its qty in stock",this.article, this.qteStock)
          if(qteCmd <= this.qteStock){
              alert("ordered quantity is available in stock");       
           
          }else{
              alert("quantity not available, select lesser qty ");
            
          }        
        });
    }
    updateQuantity(inputId:number, event:any){
      this.panierService.updateQuantity(inputId,event);  
    }
    onOrder() {
      console.log("Commande", this.commandeService.commande)
      this.commandeService.submitOrder().subscribe(res=>{
      //  this.commandeService.commande.id=res['id'] ;
      //  this.commandeService.commande.dateCommande=res['dateCommande'];
        this.panelStyle="panel-success";
    },err=>{
        console.log(err);
    });
    }

    onPayOrder() {
      this.router.navigateByUrl("/paiement/"+this.commandeService.commande.id);
    }
  
}
  
