import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProduitDetailComponent } from './produits/produit-detail/produit-detail.component';
import { ProduitListeComponent } from './produits/produit-liste/produit-liste.component';
import { ProduitEditComponent } from './produits/produit-edit/produit-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProduitData } from './produits/shared/api/produitData';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';
import { ProduitDetailGuard } from './produits/shared/guards/produit-detail.guard';
import { ProduitEditGuard } from './produits/shared/guards/produit-edit.guard';
registerLocaleData(localeFr, 'fr')
@NgModule({
  declarations: [
    AppComponent,
    ProduitListeComponent,
    ProduitDetailComponent,
    ProduitEditComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'home', component: HomeComponent},
      {path:'', redirectTo: 'home', pathMatch:'full'},
      {path:'produits/:id', component: ProduitDetailComponent,
    canActivate:[ProduitDetailGuard]},
      {path:'produits', component: ProduitListeComponent},
      {path:'produit/:id/edit', component: ProduitEditComponent,
    canDeactivate: [ProduitEditGuard]},
      {path:'**', redirectTo: 'home', pathMatch:'full'}
    ]),
    InMemoryWebApiModule.forFeature(ProduitData) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
