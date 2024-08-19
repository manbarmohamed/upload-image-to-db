// produit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8085/api/produits';

  constructor(private http: HttpClient) { }

  createProduit(name: string, description: string, image: File): Observable<Produit> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    return this.http.post<Produit>(this.apiUrl, formData);
  }

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  getProduitImageUrl(id: number): string {
    return `${this.apiUrl}/${id}/image`;
  }
}