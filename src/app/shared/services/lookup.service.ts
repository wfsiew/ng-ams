import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listGroup() {
    return this.http.get(`${this.baseUrl}/api/lookup/groups`);
  }

  listCountry() {
    return this.http.get(`${this.baseUrl}/api/lookup/countries`);
  }

  listStates(country_id) {
    return this.http.get(`${this.baseUrl}/api/lookup/country/${country_id}/states`);
  }
}
