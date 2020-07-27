import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermitService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  detail(id) {
    return this.http.get(`${this.baseUrl}/api/permit/${id}`);
  }
}
