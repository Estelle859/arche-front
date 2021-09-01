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
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule,  MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ArticleService } from './services/articles/article.service';
import { SearchBarComponent } from './pages/search-bar/search-bar.component';
import { ValiderPanierComponent } from './components/panier/valider-panier/valider-panier.component';
import { LignePanierComponent } from './components/panier/ligne-panier/ligne-panier.component';
import { ArticleComponent } from './components/article/article.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    NavbarComponent,
    SearchBarComponent,
    LignePanierComponent,
    ValiderPanierComponent,  
    ArticleComponent,   
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    
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
    MatProgressSpinnerModule,
    MatDialogModule,  
    MatTableModule,
    MatToolbarModule, 
    MatMenuModule,
 
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
