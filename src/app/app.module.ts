import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ArticleService } from './services/articles/article.service';
import { SearchBarComponent } from './pages/search-bar/search-bar.component';
import { AddPanierComponent } from './components/panier/add-panier/add-panier.component';
import { LignePanierComponent } from './components/panier/ligne-panier/ligne-panier.component';
import { ShowPanierComponent } from './components/panier/show-panier/show-panier.component';
import { ArticleComponent } from './components/article/article.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    NavbarComponent,
    SearchBarComponent,
    LignePanierComponent,
    AddPanierComponent,
    ShowPanierComponent,
    ArticleComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    BrowserAnimationsModule,  
    ReactiveFormsModule, 
    MatInputModule,
    MatAutocompleteModule,  
    MatFormFieldModule,
    MatSidenavModule,
 
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
