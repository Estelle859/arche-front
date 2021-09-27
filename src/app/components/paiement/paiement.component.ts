import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { CommandeService } from 'src/app/services/commande/commande.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  montant:number;
  currentOrder:Commande;
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private commandeService:CommandeService) { }

  ngOnInit(): void { let id=this.route.snapshot.params.orderID
    this.commandeService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
    },err=>{
      console.log(err);
    })
  }
  onPayerOrder(data: any) {
    console.log(data);
  }
  

}
