import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/articles/article.service';
import { LignePanierService } from 'src/app/services/lignePaniers/ligne-panier.service';
import { MessengerService } from 'src/app/services/messenger.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})

export class HomeComponent implements OnInit {
  
  articles: Article[] = [];
 
  constructor(private articleService: ArticleService,
    private lignePanierService: LignePanierService) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getArticles()
      .subscribe(res => {
        // this.articles = res.slice(1, 5);
        this.articles= res;
        this.articleService.articlesData = res;
      });
  }

  
    onSelectedOption(e: any) {
      this.getFilteredExpenseList();
      console.log(this.getFilteredExpenseList());
    }
  
    getFilteredExpenseList() {
      if (this.articleService.searchOption.length > 0){        
        this.articles = this.articleService.filteredListOptions();
        console.log("filteredPostsList LENGTH",this.articles.length);
    }
      else {
        this.articles = this.articleService.articlesData;
        console.log("articlesData",this.articles);
      }
  
      //console.log(this.articles);
    }

    // addToCart(e:any) {
    //   console.log("JE VIENS D AJOUTER CART",e)

    //   this.lignePanierService.addToCart(e).subscribe(res => {
       
    //   })
    // }
}
