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
  // update article stock
  updateArticleStock(prodid: number, qte: number): Observable<any> {    
    console.log("updateStock",prodid,' ',qte);
    return this.http.put(this.url+'/'+prodid,qte);
  }


  filteredListOptions() {
    let articles = this.articlesData;
        let filteredPostsList = [];
        for (let article of articles) {    
            for (let options of this.searchOption) {              
                if (options.titre === article.titre) {                                
                  filteredPostsList.push(article); 
                }
            }
        }
        return filteredPostsList;
  }

}
