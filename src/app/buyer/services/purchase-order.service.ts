import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  create(o) {
    return this.http.post(`${this.baseUrl}/api/purchase-order`, o);
  }
}
