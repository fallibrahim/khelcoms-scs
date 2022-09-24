import {InMemoryDbService} from 'angular-in-memory-web-api';
import { Iproduit } from '../model/produit';


export class ProduitData implements InMemoryDbService {
    createDb(): Record<string, Iproduit[]> {
        const produits : Iproduit[] = [
            {
                id : 1,
                nomProduit : "Café Touba 1kg",
                prix : 3000,
                rating : 3.5,
                description : "café touba bien traité, un gout unique",
                imageUrl : "assets/img/cafeTouba.jpeg",
                tags : ['nouveau']
            },
            {
                id : 2,
                nomProduit : "sankal 1kg",
                prix : 1400,
                rating : 5,
                description : "produit local bien traité et 100% naturel",
                imageUrl : "assets/img/sankal.jpeg",
                tags : ['nouveau'] 
            },
            {
                id : 3,
                nomProduit : "thiakri 1kg",
                prix : 1400,
                rating : 4.5,
                description : "produit local bien traité et 100% naturel",
                imageUrl : "assets/img/thiakry.jpeg",
                tags : ['nouveau'] 
            },

            {
                id : 4,
                nomProduit : "thiere lalo 1kg",
                prix : 1400,
                rating : 2.5,
                description : "produit local bien traité et 100% naturel",
                imageUrl : "assets/img/thiereLalo.jpeg",
                tags : ['nouveau'] 
            },
            {
                id : 5,
                nomProduit : "araw 1kg",
                prix : 1400,
                rating : 2.5,
                description : "produit local bien traité et 100% naturel",
                imageUrl : "assets/img/araw.jpeg",
                tags : ['nouveau'] 
            },
        ]
        return { produits } 
    }
    genId(produits : Iproduit[]) : number {
        return produits.length > 0 ? Math.max(...produits.map(produit => produit.id + 1)) : 1;
    }
}

   