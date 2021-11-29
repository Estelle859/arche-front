import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { Adresse } from 'src/app/interfaces/adresse';
import { Article } from 'src/app/interfaces/article';
import { Client } from 'src/app/interfaces/client';
import { Commande } from 'src/app/interfaces/commande';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { Lignecommande } from 'src/app/interfaces/lignecommande';
import { Panier } from 'src/app/interfaces/panier';
import { User } from 'src/app/interfaces/user';
import { ArticleService } from 'src/app/services/articles/article.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CommandeService } from 'src/app/services/commande/commande.service';
import { PanierService } from 'src/app/services/paniers/panier.service';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-valider-panier',
  templateUrl: './valider-panier.component.html',
  styleUrls: ['./valider-panier.component.css']
})
export class ValiderPanierComponent implements OnInit{

  public mode:number=0;
  panelStyle:string= "panel-default";  
 // public checkout : Lignecommande[] = [] ;
  public total :number = 0;
  private article: Article = {} ;
  private totalSum :any = 0;

  cartlist: Lignecommande[] =[] ;
  private qteStock: any | undefined;
  public client: Client ={};
  public adresses: Adresse[]= [];
  //public client: Client = { nom: '', prenom:'', adresses: {rue:'', ville: '' ,codePostale:''},telephone:'',email:''} ;
  constructor( 
    private router: Router,
    public panierService: PanierService,    
    public commandeService: CommandeService,
    public articleService: ArticleService
    ) {
     
  }

  ngOnInit(): void {    
    this.client = JSON.parse(sessionStorage.getItem('authenticatedUser')||'');  
    this.adresses = this.client.adresses?? [];  
  }
  onSaveClient(client:Client) {
    client=JSON.parse(sessionStorage.getItem('authenticatedUser')||''); 
    this.commandeService.setClient(client); 
    this.commandeService.loadProductsFromCart();   
    this.total =  this.commandeService.getTotalOrder(); 
    this.commandeService.setTotal(this.total);
    this.mode=1;    
  }

    updateQuantity(inputId:number, event:any){
      this.panierService.updateQuantity(inputId,event); 
      this.mode=1;
      this.commandeService.loadProductsFromCart();   
      this.total =  this.commandeService.getTotalOrder(); 
      this.commandeService.setTotal(this.total); 
      
    }
 
    commander() {
      console.log("Commande::", this.commandeService.commande);
        this.commandeService.submitOrder().subscribe(res=>{
          console.log('[POST] create commande successfully', res);
          this.commandeService.commande.id=res['id'] ;
          this.commandeService.commande.dateCommande=res['dateCommande'];
          this.panelStyle="panel-success";
        },error => {
        alert('FAIL to create Commande!');
        },
        () => {
        alert('POST Commande - now completed.');
        });   
 
    }
    payer() {  
     this.router.navigateByUrl("/paiement/"+this.commandeService.commande.id);
     console.log("payer pour ma commande",this.commandeService.commande.id);
    }
  
}
  
