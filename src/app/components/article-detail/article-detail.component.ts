import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/articles/article.service';
import { Auteur } from 'src/app/interfaces/auteur';
import { Genre } from 'src/app/interfaces/genre';
import { LignePanierService } from 'src/app/services/lignePaniers/ligne-panier.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LignePanierComponent } from '../panier/ligne-panier/ligne-panier.component';
import { PanierService } from 'src/app/services/paniers/panier.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LignePanier } from 'src/app/interfaces/ligne-panier';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {

  article: Article = {};
  cartItems: LignePanier = {};
  auteurs: Auteur[]= [];
  addCartForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private lignePanierService: LignePanierService,
    private panierService: PanierService,
    private location: Location,
    public fb: FormBuilder,


  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getArticle();

  }

  getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticleById(id)
      .subscribe(res => {
        this.article = res;
        this.auteurs = res.auteurs?? [];
      });


  }

  initForm() {
    this.addCartForm = this.fb.group({
      qty: 0
    });
  }
  onSubmitForm() {
    console.log('Your order has been submitted', this.addCartForm.value);    
    const formValue = this.addCartForm.value;
    this.cartItems.qty = formValue.qty;   
    this.cartItems.article = this.article;    
    this.addArticle(this.cartItems);
  }

  // addArticle(cartItem: LignePanier) {
  //   console.log("quantity",cartItem.qty);
  //   if (this.cartItems.qty == 0) {
  //     alert(" veuillez saisir une quantité supérieure à 0 ");
  //     return
  //   }
  //   else
  //   console.log("quantity",cartItem.qty);
  //     this.panierService.addToCart(cartItem);
  // }
  addArticle(cartLine:LignePanier){
    console.log("quantity",cartLine.qty);
    if(sessionStorage.getItem(cartLine?.article?.id?.toString()||'') != null){
      alert("vous avez déjà ajouté cet article à votre panier "); return 
    }
    if(this.cartItems.qty == 0 ){
      alert(" veuillez saisir une quantité supérieure à 0 ");
    return 
    }
    else
    sessionStorage.setItem(cartLine?.article?.id?.toString()||'', JSON.stringify(cartLine));
    location.reload();
  
  }


}