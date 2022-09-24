import { Component, OnInit } from '@angular/core';
import { Iproduit } from '../shared/model/produit';
import { ProduitListeService } from '../shared/service/produitListe.service';

@Component({
  selector: 'app-produit-liste',
  templateUrl: './produit-liste.component.html',
  styleUrls: ['./produit-liste.component.css']
})
export class ProduitListeComponent implements OnInit {
  
  public title : string = 'liste de produits';
  
  public produits : Iproduit[] = [];
  
  public errMssg !: string;
  
  public showBadge : boolean = true;

  public filteredProduits : Iproduit[] = [];
  
  public toggleIsNewBadge() : void {
    
    this.showBadge = !this.showBadge;
    
  }
  private _produitFilter = "mot";
  
  constructor(private produitListeService : ProduitListeService) { }

  ngOnInit(): void {
    this.produitListeService.getProduits().subscribe({
      
      next : produits => {
        
        this.produits = produits;
        
        this.filteredProduits = this.produits;
      },
      error : err  => this.errMssg = err
    });

    this.produitFilter = "rechercher un produit";
  }
  public get produitFilter() : string {
    return this._produitFilter
  }

  public set produitFilter(filter:string) {
      this._produitFilter = filter;
      this.filteredProduits = this._produitFilter ? this.filterProduits(this._produitFilter) : this.produits;
  }
   public filterProduits(criteria: string) : Iproduit[] {
    criteria = criteria.toLocaleLowerCase();
    const res = this.produits.filter(
      (produit :  Iproduit) => produit.nomProduit.toLocaleLowerCase().indexOf(criteria) != -1
    );
    return res;
   }
   public receiveRating !: string;
   public receiveRatingClicked (message : string) {
    this.receiveRating = message;
   }
}
