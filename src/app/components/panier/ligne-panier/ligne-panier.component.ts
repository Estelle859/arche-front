import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
public total:0 ;
  
constructor(private panierService: PanierService, private route: Router) { }

ngOnInit(): void {  
    this.getArticlesCart(); 
    console.log("length",this.cart.length) ;
    for(var i=0; i<this.cart.length; i++)
    {
      console.log(this.cart[i].qty)
      this.total += ((this.cart[i].qty ?? 0) * 100 * (this.cart[i]?.article?.prixUnitaire ?? 0)/100);
    }
    console.log("total",this.total);
  //this.panierService.getArticlesCart();
}

getArticlesCart(){
  
  for( let x = 0; x<sessionStorage.length;x++){
    console.log("CART ITEMS",sessionStorage.length,x)
    console.log("CART ITEMS OBJECT",Object.keys(sessionStorage));
    let session= sessionStorage.getItem( sessionStorage.key(x) ||"");  
    let lineCart:LignePanier;
    lineCart = JSON.parse(session || "");
    this.cart.push(lineCart);
  }

}
deleteItemStorage(index:number){
  sessionStorage.removeItem(sessionStorage.key(index) || "");
  location.reload();

}
updateAmount(inputId:number, event:any){
  var inputValue:number = event.target.value;
  let cartlineJSON:any
  cartlineJSON = JSON.parse( sessionStorage.getItem(inputId.toString()) || "");
  cartlineJSON["qty"] = inputValue;
  console.log(cartlineJSON);
  sessionStorage.setItem(inputId.toString(), JSON.stringify(cartlineJSON));
  location.reload();
  }

}
