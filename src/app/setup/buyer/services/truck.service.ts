import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

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
    return this.http.get(`${this.baseUrl}/api/buyer/${buyer_id}/trucks`, { params: prm, observe: 'response' });
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
    return this.http.post(`${this.baseUrl}/api/buyer/${buyer_id}/trucks`, { keyword: keyword }, { params: prm, observe: 'response' });
  }

  create(buyer_id, o: FormData) {
    return this.http.post(`${this.baseUrl}/api/buyer/${buyer_id}/truck`, o);
  }

  edit(buyer_id, id) {
    return this.http.get(`${this.baseUrl}/api/buyer/${buyer_id}/truck/${id}`);
  }

  update(buyer_id, id, o: FormData) {
    return this.http.put(`${this.baseUrl}/api/buyer/${buyer_id}/truck/${id}`, o);
  }

  remove(buyer_id, id) {
    return this.http.delete(`${this.baseUrl}/api/buyer/${buyer_id}/truck/${id}`);
  }
}
