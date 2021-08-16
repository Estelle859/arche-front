import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/interfaces/article';
import { LignePanier } from 'src/app/interfaces/ligne-panier';
import { ArticleService } from 'src/app/services/articles/article.service';
import { PanierService } from 'src/app/services/paniers/panier.service';
import { LignePanierComponent } from '../ligne-panier/ligne-panier.component';


@Component({
  selector: 'app-add-panier',
  templateUrl: './add-panier.component.html',
  styleUrls: ['./add-panier.component.css']
})
export class AddPanierComponent implements OnInit {

  lpanier:LignePanier[] = [];
  qte : number = 0;
  montant : number = 0;
  articles: Article[] = [];
  
  constructor(
    // private articleService: ArticleService,private panierService: PanierService,
    // private matDialog : MatDialog, public fb : FormBuilder,
    // @Inject(MAT_DIALOG_DATA) public data :any,
    // public dialogRef : MatDialogRef<LignePanierComponent>,
    ) { }

  ngOnInit(): void {
    // this.getData();
    // this.panierService.formData = this.fb.group({
    //   id:null,
    //   addedOn  : null,
    //   quantite : 0,  
    //   article : '',
    //   client : '',
    //   prixTotal : 0,
    //   lPaniers : [], 
    // });
  }
  // listPanier(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.disableClose = true;
  //   dialogConfig.width = "70%";
  //   this.matDialog.open(LignePanierComponent,dialogConfig);
  // }
  // addToCart(item:LignePanier){    
  //   this.montant = item.prixUnitaire * item.quantite ;
  //   this.panierService.montant = this.panierService.montant * this.montant;
  //   item.montant = this.montant;
  //   this.panierService.list.push(item);
  //   this.panierService.nbrArticle = this.panierService.nbrArticle+1.
  // }
  // getData() {
  //   this.articleService.getArticles()
  //     .subscribe(res => this.articleService.list = res); 
  // }

}
