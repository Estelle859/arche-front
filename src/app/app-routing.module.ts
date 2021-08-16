import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { LignePanierComponent } from './components/panier/ligne-panier/ligne-panier.component';

import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: ArticleDetailComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'panier', component: LignePanierComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}