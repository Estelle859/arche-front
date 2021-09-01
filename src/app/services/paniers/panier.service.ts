import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { Panier } from 'src/app/interfaces/panier';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/interfaces/article';


let itemsInCart = [];
let carts:Panier[] = [];



@Injectable({
  providedIn: 'root'
})

export class PanierService {
  subscribe(arg0: (status: any) => void) {
    throw new Error('Method not implemented.');
  }
 
  public formData: FormGroup;
  url = 'http://localhost:8080/api/panier/'; 


  article:Article;
  public cart:LignePanier[] = [];


  constructor() { }

  addToCart(art: Article) { 
    
   }
  
  getArticlesCart(){    
    for( let x = 0; x<sessionStorage.length;x++){   
      let session= sessionStorage.getItem( sessionStorage.key(x) ||"");  
      let lineCart:LignePanier;
      lineCart = JSON.parse(session || "");
      this.cart.push(lineCart);
    }
    return this.cart;
  
  } 
  deleteItemStorage(index:number){
    sessionStorage.removeItem(sessionStorage.key(index) || "");
    location.reload();
  
  }
  updateQuantity(inputId:number, event:any){
    var inputValue:number = event.target.value;
    let cartlineJSON:any
    cartlineJSON = JSON.parse( sessionStorage.getItem(inputId.toString()) || "");
    cartlineJSON["qty"] = inputValue;
    console.log(cartlineJSON);
    sessionStorage.setItem(inputId.toString(), JSON.stringify(cartlineJSON));
    location.reload();
    }

}