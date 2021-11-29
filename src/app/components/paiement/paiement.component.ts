import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { Paiement } from 'src/app/interfaces/paiement';
import { CommandeService } from 'src/app/services/commande/commande.service';
import { PanierService } from 'src/app/services/paniers/panier.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  montant:number;
  currentOrder:Commande;
  paie:Paiement;
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private commandeService:CommandeService,
    private panierService:PanierService,) { }

  ngOnInit(): void { let id=this.route.snapshot.params.idCommande;
    console.log("ID ORDER",id);
    this.commandeService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
    },err=>{
      console.log(err);
    })
  }
  onPayerOrder(data: any) {
    console.log("DATA" ,data);
  
    this.commandeService.addPaiement(data).subscribe(res=>{
      this.paie=res;
      sessionStorage.clear();
      alert("Vous avez passé la commande avec succès!!!");
      this.router.navigateByUrl("/home");
    },err=>{
      console.log(err);
    })
    
  }
  

}
