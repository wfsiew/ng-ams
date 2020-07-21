import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  list(page, limit, sort, dir) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.get(`${this.baseUrl}/api/buyers`, { params: prm, observe: 'response' });
  }

  search(page, limit, sort, dir, keyword) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.post(`${this.baseUrl}/api/buyers`, { keyword: keyword }, { params: prm, observe: 'response' });
  }

  create(o) {
    return this.http.post(`${this.baseUrl}/api/buyer`, o);
  }

  edit(id) {
    return this.http.get(`${this.baseUrl}/api/buyer/${id}`);
  }

  update(id, o) {
    return this.http.put(`${this.baseUrl}/api/buyer/${id}`, o);
  }

  remove(id) {
    return this.http.delete(`${this.baseUrl}/api/buyer/${id}`);
  }
}
