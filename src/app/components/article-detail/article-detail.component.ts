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
import { FormBuilder } from '@angular/forms';
import { LignePanier } from 'src/app/interfaces/ligne-panier';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {

 article: Article ;
 items:LignePanier;
 auteurs: Auteur[] = [] ;
 quantity = 0;
 montant= 0;


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private lignePanierService: LignePanierService, 
    private panierService: PanierService,   
    private location: Location,
    public fb: FormBuilder,


  ) {}

  ngOnInit(): void {
    this.getArticle();
   }

  getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticleById(id)
      .subscribe(res => {    
        this.article = res;
      });
  }
 
  addToCart(item:Article) {
    
      let local_storage;
      let itemsInCart = []

      this.items = {
      id:item.id,
      article: item,
      qty: 1,     
      addedOn:new Date ,
      prixUnitaire:item.prixUnitaire
      
    }

    if(localStorage.getItem('cart')  == null){
      local_storage =[];
      console.log("LOCAL STORAGE NULL",JSON.parse(localStorage.getItem('cart')||'{}'));
      itemsInCart.push(this.items);
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      console.log('Pushed first Item: ', itemsInCart);
    }
    else
    {
      console.log("je suis sans null")
      local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
      console.log("LOCAL STORAGE HAS ITEMS",JSON.parse(localStorage.getItem('cart') || '{}'));
      for(var i in local_storage)
      {
       
        console.log("article id, local id",this.items.article.id,local_storage[i].article.id);
        if(this.items.article.id == local_storage[i].article.id)
        {
          console.log("je suis sur articl id egal local id and qty is ", local_storage[i].quantity)
          local_storage[i].quantity += 1;
          console.log("Quantity for "+i+" : "+ local_storage[i].quantity);
          console.log('same article! index is ', i); 
          this.items =null as any;
          break;  
        }
    }
    if(this.items){
      itemsInCart.push(this.items);
    }
    local_storage.forEach(function (item:any){
      itemsInCart.push(item);
    })
    localStorage.setItem('cart', JSON.stringify(itemsInCart));
  
 
  }


}

 



}