import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { LignePanierService } from 'src/app/services/lignePaniers/ligne-panier.service';
import { PanierService } from 'src/app/services/paniers/panier.service';

@Component({
  selector: 'app-ligne-panier',
  templateUrl: './ligne-panier.component.html',
  styleUrls: ['./ligne-panier.component.css']
})
export class LignePanierComponent implements OnInit {
  

  public items: LignePanier ;
 // totalSum: number = 0;
  constructor(private panierService: PanierService, private route: Router) {

  }

  ngOnInit() {
    // this.panierService.getItems().subscribe((res:LignePanier) => {
    //   this.items = res;
    //   console.log("getting item from cart", res)
    //   // this.cartItems.forEach(value => {

    //   //   this.totalSum = this.totalSum + (value.qty * value.prixUnitaire);
    //   // });
    // });  
    this.items = this.panierService.getItems();

  }
  // updateCart(id:any, quantite:any) {
  //   this.lp.updateCartItem(id.value, quantite.value).subscribe((res: LignePanier[]) => {
  //     this.cartItems = res;
  //     this.cartItems.forEach(value => {
  //       this.totalSum = this.totalSum + (value.qty * value.prixUnitaire);
  //     });
  //   });
  // }
  // deleteItem(id:any) {
  //   this.lp.deleteCartItem(id.value).subscribe((res: LignePanier[]) => {
  //     this.cartItems = res;
  //     this.cartItems.forEach(value => {
  //       this.totalSum = this.totalSum + (value.qty * value.prixUnitaire);
  //     });
  //   });
  // }

  // placeOrder() {
  //   this.lp.placeOrder().subscribe(res => {
  //     console.log(res);
  //   });
  //   this.route.navigate(['/home']);
  // }

}
