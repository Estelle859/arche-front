import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PanierService } from 'src/app/services/paniers/panier.service';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-valider-panier',
  templateUrl: './valider-panier.component.html',
  styleUrls: ['./valider-panier.component.css']
})
export class ValiderPanierComponent implements OnInit{

  private authenticationServiceSubscription : Subscription;
  public checkout : LignePanier[] = [] ;
  public total: any| undefined  = 0;  

  constructor( 
    private authenticationService: AuthenticationService,
    private userService: UserService,  
    private router: Router,
    private panierService: PanierService
    ) {
     
  }
  ngOnDestroy(){
   
  }

  ngOnInit(): void {    
    
    this.checkout = this.panierService.getArticlesCart();  

    console.log('checkoutdata', this.checkout);

    for(var i=0; i<this.checkout.length; i++)
    {
      const prix: any| undefined =  this.checkout[i].article?.prixUnitaire;   
      const qty: any| undefined =  this.checkout[i].qty; 
      console.log("prix and quantity",prix,qty);
      this.total += prix * qty;
      console.log("total",this.total);
    }   

  }
  
  onCheckout(){
   console.log('Thank You For Shopping With Us','Order Placed Successfully');
  }
}
  

