import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listPending(page, limit, sort, dir) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.get(`${this.baseUrl}/api/assign/materials`, { params: prm, observe: 'response' });
  }

  searchPending(page, limit, sort, dir, keyword) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.post(`${this.baseUrl}/api/assign/materials`, { keyword: keyword }, { params: prm, observe: 'response' });
  }

  listActive(mining_company_id, page, limit, sort, dir) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.get(`${this.baseUrl}/api/assigned/materials/${mining_company_id}`, { params: prm, observe: 'response' });
  }

  searchActive(mining_company_id, page, limit, sort, dir, keyword) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.post(`${this.baseUrl}/api/assigned/materials/${mining_company_id}`, { keyword: keyword }, { params: prm, observe: 'response' });
  }

  assign(o) {
    return this.http.post(`${this.baseUrl}/api/assigned/material`, o);
  }

  remove(o) {
    return this.http.post(`${this.baseUrl}/api/assigned/material/delete`, o);
  }
}
