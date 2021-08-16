import { Component, OnInit } from '@angular/core';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { MessengerService } from 'src/app/services/messenger.service';
import { PanierService } from 'src/app/services/paniers/panier.service';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-show-panier',
  templateUrl: './show-panier.component.html',
  styleUrls: ['./show-panier.component.css']
})
export class ShowPanierComponent implements OnInit {

  cartItems:any = [];

  cartTotal = 0

  constructor(
    private msg: MessengerService,
    private cartService: PanierService
    ) { }

  ngOnInit() {
    // this.handleSubscription();
    // this.loadCartItems();
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    // this.cartService.getPanierAll().subscribe((items: LignePanier[]) => {
    //   this.cartItems = items;
    //   this.calcCartTotal();
    // })
  }

  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach((item: any) => {
      this.cartTotal += (item.qty * item.price)
    })
  }

}
