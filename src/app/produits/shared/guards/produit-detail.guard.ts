import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProduitDetailGuard implements CanActivate {
  constructor(
    private router : Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      const id = +next.url[1].path;
      if(isNaN(id) || id <= 0) {
        alert('produit est inconnu');
        this.router.navigate(['/produits']);
        return false;
      }
    return true;
  }
  
}


