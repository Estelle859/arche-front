import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { Panier } from 'src/app/interfaces/panier';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/interfaces/article';
import { User } from 'src/app/interfaces/user';
import { Client } from 'src/app/interfaces/client';


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
  public cartItems:LignePanier[] = [];
  public cart:Panier={};

  constructor() { }

  addArticle(item: LignePanier) { 
    this.addArticleToCart(item)
    this.saveCart();
   }

  addArticleToCart(cartLine:LignePanier) {
    console.log("quantity",cartLine.qty);
    if(sessionStorage.getItem(cartLine?.article?.id?.toString()||'') != null){
      alert("vous avez déjà ajouté cet article à votre panier ");
      const session = sessionStorage.getItem(cartLine?.article?.id?.toString()||'');
      console.log(session);
      cartLine.qty  =  JSON.parse(session || "").qty +  cartLine.qty;
      sessionStorage.setItem(cartLine?.article?.id?.toString()||'', JSON.stringify(cartLine));
      location.reload();
      return ;
    }
    if(cartLine.qty == 0 ){
      alert(" veuillez saisir une quantité supérieure à 0 ");
    return 
    }
    else
    sessionStorage.setItem(cartLine?.article?.id?.toString()||'', JSON.stringify(cartLine));
    location.reload();
    // let cart=this.carts[this.currentCartName];
    // let item=cart.items[id];
    // if(item===undefined) {
    //   item:LignePanier={};
    //   item.id=id;
    //   item.name=name;
    //   item.price=price;
    //   item.quantity=quantity;
    //   cart.items[id]=item;
    // }
    // else{
    //   item.quantity+=quantity;
    // }
  }
   
   saveCart() {
    //save cart in session storage
    sessionStorage.setItem("myCart",JSON.stringify(this.cart));
    //sessionStorage.setItem(this.cart?.id?.toString()||'', JSON.stringify(this.cart));    
  }
  getArticlesCart(){  
    const keys = Object.keys(sessionStorage);   
    console.log("keys",keys)
    for( let x = 0; x<sessionStorage.length;x++){
      if(keys[x] == 'authenticatedUser'&&'mycart'){
        console.log("je suis user",x);
      }else{
        let session= sessionStorage.getItem( sessionStorage.key(x) ||"");  
        let lineCart:LignePanier;
        lineCart = JSON.parse(session || "");
        this.cartItems.push(lineCart);
      }
   
    }
    return this.cartItems;
  
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
    
    setClient(client: Client) {
      this.getCart().client=client;
      this.saveCart();
    }
 
    public getCart():Panier{ 
      this.cart.lPaniers = this.getArticlesCart();
      return this.cart;
    }
    getSize(){    
      return Object.keys(this.cartItems).length;
    }
    public getTotalCart():number{
      let total:any=0;
      console.log("total from service",this.cart.lPaniers)
      this.cart?.lPaniers?.forEach(p=>{
        let prix:any = p.prix?? [];
        let qty:any = p.qty?? [];
        total+=prix * qty;
      });
       return total;
    }




}