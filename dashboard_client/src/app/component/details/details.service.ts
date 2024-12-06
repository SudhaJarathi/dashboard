import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private apiUrl = '/api/dashboard';

  constructor(private http: HttpClient) {}

  getDetailsData(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createData(newData: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, newData);
  }

  updateData(updatedData: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/${updatedData.id}`, updatedData);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
