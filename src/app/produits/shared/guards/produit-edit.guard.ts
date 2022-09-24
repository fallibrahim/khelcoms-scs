import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProduitEditComponent } from '../../produit-edit/produit-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProduitEditGuard implements CanDeactivate<ProduitEditComponent> {
  canDeactivate(
    component: ProduitEditComponent) : boolean {
        if (component.produitForms.dirty){
         const produitNom =  component.produitForms.get('nomProduit')!.value || 'Nouveau produit'
         return confirm(`Voulez-vous annuler les changements effectués sur ${produitNom}`)
        }
      return true;
    }
  }
  

