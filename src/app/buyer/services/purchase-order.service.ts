import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  list(buyer_id, page, limit, sort, dir) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit)
      .set('buyer_id', buyer_id);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.get(`${this.baseUrl}/api/purchase-orders`, { params: prm, observe: 'response' });
  }

  search(buyer_id, page, limit, sort, dir, keyword) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.post(`${this.baseUrl}/api/purchase-orders`, { keyword: keyword, buyer_id: buyer_id }, { params: prm, observe: 'response' });
  }

  create(o) {
    return this.http.post(`${this.baseUrl}/api/purchase-order`, o);
  }

  detail(id) {
    return this.http.get(`${this.baseUrl}/api/purchase-order/${id}`);
  }
}
