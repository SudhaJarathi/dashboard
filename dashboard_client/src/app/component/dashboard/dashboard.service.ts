import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:48612/api/dashboard';

  constructor(private http: HttpClient) {}

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
