import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduit } from '../shared/model/produit';
import { ProduitListeService } from '../shared/service/produitListe.service';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {
  public produit : Iproduit =  <Iproduit>{}
  constructor(
    private route : ActivatedRoute,
    private produitService : ProduitListeService,
    private router : Router
  ) { }

  ngOnInit(): void {
  const id = +this.route.snapshot.paramMap.get('id')!;
  this.produitService.getProduits().subscribe((produits:Iproduit[]) =>{
    this.produit = produits.find((produit : Iproduit) => produit.id === id)!;
    console.log('hotel : ', this.produit);
  })

  }
   public backToListe() :  void {
    this.router.navigate(['/produits']);
  }
}
