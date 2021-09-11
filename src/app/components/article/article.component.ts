import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() public article:any;

  @Output() productAddToCart: EventEmitter<Article> = new EventEmitter<Article>();
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  addToCart() {  
    this.productAddToCart.emit(this.article);
  }
    

}
