import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LignePanierService } from 'src/app/services/lignePaniers/ligne-panier.service';
import { PanierService } from 'src/app/services/paniers/panier.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ligne-panier',
  templateUrl: './ligne-panier.component.html',
  styleUrls: ['./ligne-panier.component.css']
})
export class LignePanierComponent implements OnInit,OnDestroy {

public cart:LignePanier[]= [];
public total:number;
//private article: Article = {} ;
//private qteStock: any | undefined;
private authenticationServiceSubscription : Subscription;

constructor(private panierService: PanierService,
            private router: Router,        
            private authenticationService: AuthenticationService,
            private userService: UserService, 

          ) { }

  ngOnInit(): void {  
   
      this.getArticlesCart();     
      this.total = this.getTotal();
    
  }

  getArticlesCart(){
    const keys = Object.keys(sessionStorage); 
    for( let i = 0; i<sessionStorage.length;i++){     
      console.log("KEYS",Object.keys(sessionStorage));      
   
      if(keys[i] == 'authenticatedUser'&&'mycart'){
        console.log("je suis user",i);
      }else{
        let session= sessionStorage.getItem( sessionStorage.key(i) ||"");   
        let lineCart!:LignePanier; 
        lineCart = JSON.parse(session || "");
        this.cart.push(lineCart);
      }
    }
  }
  deleteItemStorage(index:number){  
    this.panierService.deleteItemStorage(index);
  }
  updateQuantity(inputId:number, event:any){
    this.panierService.updateQuantity(inputId,event);  
  }
 getTotal(){
  var qty:number;
  var prix:number;
  var tot:number = 0;
  console.log("LENGTH", sessionStorage.length)
  for( let i = 0; i<sessionStorage.length;i++){
    let session= sessionStorage.getItem( sessionStorage.key(i) ||"");   
    let lineCart!:LignePanier; 
    lineCart = JSON.parse(session || "");
    const str_qty =  JSON.parse(session || "").quantiteCommande;   
    const str_article =  JSON.parse(session || "").article;      
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
  // getTotalCart() {
  //   return this.panierService.getTotalCart();
  // }
  
  valider(){    
    this.router.navigate(['/commande']);    
  }
  
  ngOnDestroy(){
     if(this.authenticationServiceSubscription){
       this.authenticationServiceSubscription.unsubscribe();
     }
 

}


}