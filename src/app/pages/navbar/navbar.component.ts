import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LignePanierComponent } from 'src/app/components/panier/ligne-panier/ligne-panier.component';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { PanierService } from 'src/app/services/paniers/panier.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: LignePanier;
  constructor(   
    // private matDialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogref:MatDialogRef<LignePanierComponent>,
      public panierService:PanierService,
    )
     { }

  ngOnInit(): void {
  }
  // panier(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.disableClose = true;
  //   dialogConfig.width = "70%";
  //   this.matDialog.open(LignePanierComponent,dialogConfig);
  // }
 
  panier(){    
      console.log("cart has these items")
      this.items = JSON.parse(localStorage.getItem('cart') || '{}');

      return this.items = JSON.parse(localStorage.getItem('cart')|| '{}'); 
     
  }
  





}
