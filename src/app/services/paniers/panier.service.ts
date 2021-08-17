import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { Panier } from 'src/app/interfaces/panier';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/interfaces/article';

let itemsInCart = [];
let cart = [];

@Injectable({
  providedIn: 'root'
})

export class PanierService {
 
  public formData: FormGroup;
  url = 'http://localhost:8080/api/panier/'; 

  // qty : number = 0;
  // totaltht : number = 0;
  // totaltva: number = 0;
  // totalttc: number = 0;
  // panier : any = {};
  // nbrArticle: number =  0;
  // montant:number=0;
  article:Article;
  public items:LignePanier[] = [];


  constructor() { }

  addToCart(cartItem: LignePanier) {
    // if(sessionStorage.getItem(cartItem.article.id.toString()) != null){
    //   alert("vous avez déjà ajouté cet article à votre panier "); 
    //   return 
    // }
    if(cartItem.qty == 0 ){
      alert(" veuillez saisir une quantité supérieure à 0 ");
    return 
    }
    else
   // sessionStorage.setItem(cartItem.id.toString(), JSON.stringify(cartItem));
    sessionStorage.setItem('cart', JSON.stringify(cartItem));
    location.reload();
  

    // let local_storage;
    // let itemsInCart = []
    // let subject = new Subject<any>();


    // this.items = {
    //   id:cartItem.id,
    //   article: cartItem.article,
    //   qty: 1,     
    //   addedOn:new Date ,
    //   prixUnitaire:cartItem.prixUnitaire
      
    // }
    // if(localStorage.getItem('cart')  == null){
    //   local_storage =[];
    //   itemsInCart.push(this.items);
    //   localStorage.setItem('cart', JSON.stringify(itemsInCart));
    //   subject.next('changed');
    // }
    // else
    // {
    //   local_storage = JSON.parse(localStorage.getItem('cart')||'{}');      
    //   for(var i in local_storage)
    //   {  
    //     if(this.items.article.id == local_storage[i].article.id)
    //     {
    //       local_storage[i].qty += 1;       
    //       console.log("Quantity for "+i+" : "+ local_storage[i].qty); 
    //       this.items = null as any;       
    //       break;  
    //     }
    // }
    // if(this.items){
    //   itemsInCart.push(this.items);
    // }
    // local_storage.forEach(function (article:any){
    //   itemsInCart.push(article);
    // })
    // localStorage.setItem('cart', JSON.stringify(itemsInCart));

    // }
  }
  getItems(){ 
    this.items = JSON.parse(sessionStorage.getItem('cart')||'{}'); 
    console.log("Items",this.items)
    return this.items; 
  //   for( let x = 0; x<sessionStorage.length;x++){

  //     let session= sessionStorage.getItem( sessionStorage.key(x) ||"");
  //     let lineCart!:LignePanier;
  //     lineCart.qty = JSON.parse(session || "").qty;
  //     lineCart.article= JSON.parse(session || "").article;
  //       this.items.push(lineCart);
      
  //     }
  //     return this.items;
   }


  //  deleteItem(art:any){
  //    //art = art
  //    console.log("Deleting : ",art);
  //    let shopping_cart;
  //    let index;
  //    shopping_cart = JSON.parse(localStorage.getItem('cart')|| '{}');
  //    for(let i in shopping_cart){
  //      if (this.items?.article.titre == shopping_cart[i].article.tire)
  //      {
  //        index = i;
  //        console.log(index);
  //      }
  //    }
  //    shopping_cart.splice(index, 1);
  //    console.log("shopping_cart ", shopping_cart);
  //    localStorage.setItem('cart', JSON.stringify(shopping_cart));
  //   }
  //   addQty(item: LignePanier)
  // {
  //   item = item;
  //   let shopping_cart;
  //   shopping_cart = JSON.parse(localStorage.getItem('cart')|| '{}');
  //   for(let i in shopping_cart){
  //     if(item.article.titre == shopping_cart[i].article.titre){
  //       shopping_cart[i].quantity +=1;
  //       item = null as any;
  //       break;
  //     }
  //   }
  //   localStorage.setItem('cart', JSON.stringify(shopping_cart));

  // }
  // numberOfItems(){
  //   let itemsInCart = JSON.parse(localStorage.getItem('cart') || '{}');
  //   return itemsInCart.length;
  // }
  // clearCart(){
  //   localStorage.clear();
  // }
  }