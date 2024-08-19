import { Component, OnInit } from '@angular/core';
import { Produit } from '../../model/produit';
import { ProduitService } from '../../service/produit.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css'
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];
  newProduit: Produit = { name: '', description: '' };
  selectedFile: File | null = null;

  constructor(private produitService: ProduitService) { }

  ngOnInit() {
    this.loadProduits();
  }

  loadProduits() {
    this.produitService.getAllProduits().subscribe(
      produits => this.produits = produits,
      error => console.error('Error loading produits', error)
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      this.produitService.createProduit(this.newProduit.name, this.newProduit.description, this.selectedFile).subscribe(
        produit => {
          this.produits.push(produit);
          this.newProduit = { name: '', description: '' };
          this.selectedFile = null;
        },
        error => console.error('Error creating produit', error)
      );
    }
  }

  getProduitImageUrl(id?: number): string {
    return id ? this.produitService.getProduitImageUrl(id) : '';
  }
}
