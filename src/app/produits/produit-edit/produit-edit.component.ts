import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, fromEvent, merge, Observable } from 'rxjs';


import { Iproduit } from '../shared/model/produit';
import { ProduitListeService } from '../shared/service/produitListe.service';
import { GlobalGenericValidator } from '../shared/service/validators/global-generic.validators';
import { NumberValidators } from '../shared/service/validators/numbers.validators';

@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.css']
})
export class ProduitEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, {read : ElementRef}) inputElements! : ElementRef[];
  public pageTitle !: string;
  public produitForms !: FormGroup;
  public produit !: Iproduit;
  public errorMessage !:  string;
  public formErrors: { [ key : string ] : string } = {};
  public validationMessage: { [ key : string ] : { [ key:string ]:string } } = {
    nomProduit : {
      required : 'le nom du produit est obligatoire.',
      minlength : 'le nom du produit doit comporter au moins 4 caractère.'
    },
   prix : {
      required : 'le prix du produit est obligatoire.',
      pattern : 'le prix du produit doit etre un nombre.'
    },
    rating : {
     range : 'la note doit etre comprise entre 1 et 5.'
    }
  };
  private globalGenericValidator !: GlobalGenericValidator;
  private isFormSubmitted !: boolean;

  constructor(
     private route : ActivatedRoute,
     private router : Router,
     private produitService : ProduitListeService
  ) { }

  ngOnInit(): void {
    this.globalGenericValidator = new GlobalGenericValidator(this.validationMessage)
    this.produitForms = new FormGroup({
      nomProduit : new FormControl('', [Validators.required, Validators.minLength(4)]),
      prix : new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      rating : new FormControl('', NumberValidators.range(1, 5)),
      description : new FormControl(''),
      tags : new FormArray([])
    })
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.getSelectedProduit(id)
    })
    
  }
  ngAfterViewInit() {
    const formControlBlurs : Observable<unknown>[] = this.inputElements
    .map((formControlElemRef :ElementRef) => fromEvent(formControlElemRef.nativeElement,
    'blur'));
    merge(this.produitForms.valueChanges, ...formControlBlurs)
    .pipe(
      debounceTime(800)
      // debounce(() => this.isFormSubmitted ? EMPTY : timer(800))
    )
   .subscribe(() => {
    this.formErrors = this.globalGenericValidator.createErrorMessage(this.produitForms, this.isFormSubmitted);
    console.log('errors : ', this.formErrors)
  });
  }
  public hideError() : void {
    this.errorMessage = null!;
  }
    public get tags(): FormArray {
      return this.produitForms.get('tags') as FormArray;
    }
    public addTags(): void {
      this.tags.push(new FormControl());
    }
    public deleteTags(index:number): void {
      this.tags.removeAt(index)
      this.tags.markAsDirty()
    }
  public getSelectedProduit(id: number) : void {
    this.produitService.getProduitById(id).subscribe((produit) => 
      this.displayProduit(produit))
  }
  public displayProduit(produit : Iproduit | null | undefined) : void {
     this.produit = produit!;
     if (this.produit.id == 0) {
         this.pageTitle = 'Créer un produit';
     }
     else {
          this.pageTitle = `Modifier le produit ${this.produit.nomProduit}`;
     }

     this.produitForms.patchValue({
      nomProduit : this.produit.nomProduit,
      prix : this.produit.prix,
      rating : this.produit.rating,
      description : this.produit.description
     });

  }

  public saveProduit() : void {
    this.isFormSubmitted = true;
    this.produitForms.updateValueAndValidity({
      onlySelf:true,
      emitEvent:true
    })
    if (this.produitForms.valid) {
    
      if (this.produitForms.dirty) {
        
        const produit : Iproduit = {
          ...this.produit,
          ...this.produitForms.value
        };

        if (produit.id == 0) {
          this.produitService.createProduit(produit).subscribe({
            next : () => this.saveCompleted(),
            error : (err)  => this.errorMessage = err
          });
        }
        else {
           this.produitService.updateProduit(produit).subscribe({
            next : ()  => this.saveCompleted(),
            error : (err)  => this.errorMessage = err
           });
        }
      }
    }
    else {
      this.errorMessage = 'Corrigez les erreurs svp.'
    }
  }
   public deleteProduit() {
    if(confirm(`Voulez-vous vraiment supprimer ${this.produit.nomProduit} ?`)) {
      this.produitService.deleteProduit(this.produit.id).subscribe({
        next : () => this.saveCompleted()
     })
    }
   }

    public saveCompleted() : void {
    this.produitForms.reset();
    this.router.navigate(['/produits']);
   }
   
}


