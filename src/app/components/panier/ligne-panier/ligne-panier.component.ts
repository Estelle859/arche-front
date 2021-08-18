import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { LignePanierService } from 'src/app/services/lignePaniers/ligne-panier.service';
import { PanierService } from 'src/app/services/paniers/panier.service';

@Component({
  selector: 'app-ligne-panier',
  templateUrl: './ligne-panier.component.html',
  styleUrls: ['./ligne-panier.component.css']
})
export class LignePanierComponent implements OnInit {

public cart:LignePanier[]= [];
public total:number;

constructor(private panierService: PanierService, private route: Router) { }

  ngOnInit(): void {  
      this.getArticlesCart();   
      this.total = this.getTotal()  ;
  }

  getArticlesCart(){
    
    for( let i = 0; i<sessionStorage.length;i++){
      console.log("CART ITEMS",sessionStorage.length,i)
      console.log("CART ITEMS OBJECT",Object.keys(sessionStorage));
      let session= sessionStorage.getItem( sessionStorage.key(i) ||"");  
      let lineCart!:LignePanier; 
      lineCart = JSON.parse(session || "");

      this.cart.push(lineCart);
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
  for( let i = 0; i<sessionStorage.length;i++){

    let session= sessionStorage.getItem( sessionStorage.key(i) ||""); 
    console.log(session)
    let lineCart!:LignePanier; 
    lineCart = JSON.parse(session || "");
    const str_qty =  JSON.parse(session || "").qty;   
    const str_article =  JSON.parse(session || "").article; 
  
    if (str_qty == null || str_qty == "null"){
      console.log("QTYNULL", str_qty )
      tot = 0;
    } else {
      console.log("QTY", str_qty )
      console.log("ARTICLE", str_article.prixUnitaire )
      qty = parseInt(str_qty);
      prix = parseInt(str_article.prixUnitaire);
      tot =  tot + (qty *prix) ; 
     
      console.log("tot", tot );
    } 
   
  }

  return tot;    
  }

}


