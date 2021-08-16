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
  // list : any = [];
  // qty : number = 0;
  // totaltht : number = 0;
  // totaltva: number = 0;
  // totalttc: number = 0;
  // panier : any = {};
  // nbrArticle: number =  0;
  // montant:number=0;
  article:Article;
  items:LignePanier;


  constructor(private http: HttpClient) { }

  addToCart(article: Article) {

    let local_storage;
    let itemsInCart = []
    let subject = new Subject<any>();


    this.items = {
      id:article.id,
      article: article,
      qty: 1,     
      addedOn:new Date ,
      prixUnitaire:article.prixUnitaire
      
    }
    if(localStorage.getItem('cart')  == null){
      local_storage =[];
      itemsInCart.push(this.items);
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      subject.next('changed');
    }
    else
    {
      local_storage = JSON.parse(localStorage.getItem('cart')||'{}');      
      for(var i in local_storage)
      {  
        if(this.items.article.id == local_storage[i].article.id)
        {
          local_storage[i].qty += 1;       
          console.log("Quantity for "+i+" : "+ local_storage[i].qty); 
          this.items = null as any;       
          break;  
        }
    }
    if(this.items){
      itemsInCart.push(this.items);
    }
    local_storage.forEach(function (article:any){
      itemsInCart.push(article);
    })
    localStorage.setItem('cart', JSON.stringify(itemsInCart));

    }
  }
  getItems(){
    
    return this.items = JSON.parse(localStorage.getItem('cart')||'{}'); 
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