import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { User } from 'src/app/interfaces/user';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LignePanierService {
  url = 'http://localhost:8080/api/lignepanier/';
  urlCli = 'http://localhost:8080/api/client/';

  public list: LignePanier[] = [];

  constructor(private http : HttpClient) { } 
  
  // getCartItems () : Observable<LignePanier[]> {
  //   return this.http.get<LignePanier[]>(this.url+'all')
  // }

  // getCartItem (userId : any, productId : any) : Observable<LignePanier> {
  //   return this.http.get<LignePanier>(this.url+ userId+productId)
  // }

  // addToUserCart (userId : any, productId : any) : Observable<Client> {
  //     return this.http.post<Client>(this.urlCli  + userId + '/panier/add/' + productId, {
  //   })
  // }

  // getUserCart (userId : any) : Observable<LignePanier[]> {
  //   return this.http.get<LignePanier[]>(this.urlCli + userId +'/' + 'panier')
  // }

  // updateUserCartItem (userId : any, productId : any, quantity : Number) : Observable<Client> {
  //   return this.http.put<Client>( this.urlCli + userId + '/panier/update/' +productId, {
  //   quantity
  // })
  // }

  // deleteUserCartItem (userId : any, productId :any) : Observable<any> {
  //   return this.http.delete(this.urlCli + userId +'/panier/remove/' + productId)
  // }

  public getLignePanierAll(): Observable<any> {
    return this.http.get<LignePanier>(this.url);
  } 
  public getLignePanierById(id: number): Observable<Object> {
    return this.http.get<LignePanier>(this.url + id);
  }
  public addLignePanier(info: Object): Observable<Object> {
    return this.http.post(this.url,info);
  }
  public updateLignePanier(id: number, value:any): Observable<Object> {
    return this.http.post(this.url+id,value);
  }
  public deleteLignePanier(id: number): Observable<any> {
    return this.http.delete(this.url+id,{responseType:'text'});
  }
   // Add Products to the Cart
   addToCart(product: Article ): Observable<any> {
    return this.http.get<any>(this.url+product.id);
  }

  // View Cart items
  getCartItems(): Observable<any> {
    return this.http.get<any>(this.url+"all");
  }

  // update items quantity in the cart
  updateCartItem(prodid: number, qte: number): Observable<any> {
    return this.http.post(this.url+prodid,qte);
  }

  // delete cart Item 
  deleteCartItem(id: number): Observable<any> {
    return this.http.delete<any>(this.url+"delete" + "?id=" + id);
  }   
}
