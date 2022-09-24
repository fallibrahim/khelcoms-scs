import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError, tap, of } from "rxjs";
import { Iproduit } from "../model/produit";

@Injectable({
  
    providedIn : 'root'
    
})
export class ProduitListeService {
  
 private readonly PRODUIT_API_URL = 'api/produits';
 
  constructor(private http : HttpClient) {

  }
  public getProduits() : Observable<Iproduit[]> {
    
    return this.http.get<Iproduit[]>(this.PRODUIT_API_URL).pipe(
      
        tap(produits => console.log('produits :', produits)),
        
        catchError(this.handleError)
    ) 
  }
  public getProduitById(id : number) : Observable<Iproduit | null | undefined> {
    
      const url = `${this.PRODUIT_API_URL}/${id}`;
      
      if(id == 0){
        
         return of(this.getDefaultProduit())
      }
      
      return this.http.get<Iproduit>(url).pipe(
        
        catchError(this.handleError)
      );
  }
  public createProduit(produit : Iproduit) : Observable <Iproduit | null | undefined> {
    
     produit = {
      
       ...produit,
       
       imageUrl : 'assets/img/sankal.jpeg',
       
       id : null!
     };
     return this.http.post<Iproduit>(this.PRODUIT_API_URL, produit).pipe(
      
      catchError(this.handleError)
      
     )
  }
  public updateProduit(produit : Iproduit) : Observable<Iproduit | null | undefined> {
    
    const url = `${this.PRODUIT_API_URL}/${produit.id}`;

    return this.http.put<Iproduit>(url, produit).pipe(
      
      catchError(this.handleError)
      
    )
  }
  public deleteProduit(id : number) : Observable<{}> {

    const url = `${this.PRODUIT_API_URL}/${id}`;
    
    return this.http.delete<Iproduit>(url).pipe(
      
      catchError(this.handleError)
    )
  } 
  private getDefaultProduit() : Iproduit{
    
    return {
      id : 0,
      nomProduit : null!,
      prix : null!,
      description : null!,
      rating : null!,
      imageUrl : null!
    }
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage!: string;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorMessage = `An error occurred:, ${error.error.message}`;
       
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${ error.status } `+
        `body was: ${ error.status }`);
        errorMessage = `Backend returned code ${ error.status }, ` +
        `body was: ${ error.status }`;
        
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.' +
    errorMessage));
  }
}