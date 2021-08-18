import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<Article[]> | undefined;
  allArticles: Article[]  = [] ;
  autoCompleteList!: any[];
  searchOption:any =[];


  @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe(articles => {
      this.allArticles = articles;

    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
      console.log("UI",userInput);
    })
  }
  private autoCompleteExpenseList(input: any) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
    console.log("categoryList",categoryList);
  }
  filterCategoryList(val: any) {
    var categoryList = [] ;
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allArticles.filter(s => s?.titre?.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allArticles;
  }

  displayFn(art: any) {    
    let k = art ? art.titre ?? "" : "";
   // console.log("display k", k);
    return k;
  }

  filterArticleList(event:any) {
    var articles= event.source.value;
        if(!articles) {
          this.searchOption = this.articleService.searchOption;
          this.searchOption=[];
        }
        else {
            console.log("not")
            this.searchOption = this.articleService.searchOption;
            this.searchOption.push(articles);
            this.onSelectedOption.emit(this.searchOption)
        }
        
        this.focusOnPlaceInput();         
  }


  removeOption(option:any) {
    this.searchOption = this.articleService.searchOption;   
    let index = this.searchOption.indexOf(option);
    if (index >= 0)
        this.searchOption.splice(index, 1);
        this.focusOnPlaceInput();
        this.onSelectedOption.emit(this.searchOption)
}

focusOnPlaceInput() {
  this.autocompleteInput.nativeElement.focus();
  this.autocompleteInput.nativeElement.value = '';
}

}
