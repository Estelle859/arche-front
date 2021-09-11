import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { LoginComponent } from './components/login/login.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { LignePanierComponent } from './components/panier/ligne-panier/ligne-panier.component';
import { ValiderPanierComponent } from './components/panier/valider-panier/valider-panier.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGaurdService } from './services/authentication/auth-gaurd.service';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: ArticleDetailComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'panier', component: LignePanierComponent },  
  { path: 'commande', component: ValiderPanierComponent, canActivate: [AuthGaurdService] },
  { path:'paiement/:idCommande', component:PaiementComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}