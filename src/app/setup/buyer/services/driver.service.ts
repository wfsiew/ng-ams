import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  list(buyer_id, page, limit, sort, dir) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.get(`${this.baseUrl}/api/buyer/${buyer_id}/drivers`, { params: prm, observe: 'response' });
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
    return this.http.post(`${this.baseUrl}/api/buyer/${buyer_id}/drivers`, { keyword: keyword }, { params: prm, observe: 'response' });
  }

  create(buyer_id, o) {
    return this.http.post(`${this.baseUrl}/api/buyer/${buyer_id}/driver`, o);
  }

  edit(buyer_id, id) {
    return this.http.get(`${this.baseUrl}/api/buyer/${buyer_id}/driver/${id}`);
  }

  update(buyer_id, id, o) {
    return this.http.put(`${this.baseUrl}/api/buyer/${buyer_id}/driver/${id}`, o);
  }

  remove(buyer_id, id) {
    return this.http.delete(`${this.baseUrl}/api/buyer/${buyer_id}/driver/${id}`);
  }
}
