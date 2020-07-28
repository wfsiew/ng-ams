import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryOrderService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  list(status, page, limit, sort, dir) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit)
      .set('status', status);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.get(`${this.baseUrl}/api/delivery-orders`, { params: prm, observe: 'response' });
  }

  search(status, page, limit, sort, dir, keyword) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit)
      .set('status', status);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.post(`${this.baseUrl}/api/delivery-orders`, { keyword: keyword }, { params: prm, observe: 'response' });
  }

  updateTime(o) {
    return this.http.post(`${this.baseUrl}/api/delivery-order/${o.id}/timestamp`, o);
  }
}
