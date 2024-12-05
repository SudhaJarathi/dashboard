import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private apiUrl = 'http://localhost:48612/api/dashboard';

  constructor(private http: HttpClient) {}

  getDetailsData(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateData(updatedData: Product): void {
    this.http.put(`${this.apiUrl}/${updatedData.id}`, updatedData);
  }

  deleteData(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`);
  }
}
