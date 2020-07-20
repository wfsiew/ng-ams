import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

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
    return this.http.get(`${this.baseUrl}/api/countries`, { params: prm, observe: 'response' });
  }

  create(o) {
    return this.http.post(`${this.baseUrl}/api/country`, o);
  }

  edit(id) {
    return this.http.get(`${this.baseUrl}/api/country/${id}`);
  }
}
