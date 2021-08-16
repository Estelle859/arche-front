import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = 'http://localhost:8080/api/article';

  searchOption:any = [];
  
  public articlesData: Article[] = [];

  public list: Article[] = [];



  constructor(private http: HttpClient) {
  }

  getArticles(): Observable<Array<Article>> {
    return this.http.get<Array<Article>>(this.url+'');
  }
  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(this.url + '/' +id);
  }

  filteredListOptions() {
    let articles = this.articlesData;
    console.log("ARTCILES", articles);
        let filteredPostsList = [];
        for (let article of articles) {
          console.log("this.searchOption", this.searchOption);
            for (let options of this.searchOption) {
              console.log("this.option", options);
                if (options.titre === article.titre) { 
                  console.log("egale");                 
                  filteredPostsList.push(article);
                  console.log("filteredPostsList",filteredPostsList); 
                }
            }
        }
        console.log("filteredPostsList",filteredPostsList.length);
        return filteredPostsList;
  }
}
