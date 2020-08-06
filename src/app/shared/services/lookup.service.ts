import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listBuyer() {
    return this.http.get(`${this.baseUrl}/api/lookup/buyers`);
  }

  listTruck(buyer_id) {
    return this.http.get(`${this.baseUrl}/api/lookup/buyer/${buyer_id}/trucks`);
  }

  listDriver(buyer_id) {
    return this.http.get(`${this.baseUrl}/api/lookup/buyer/${buyer_id}/drivers`);
  }

  listMaterial(mining_company_id) {
    let prm: HttpParams = new HttpParams()
      .set('mining_company_id', mining_company_id);
    return this.http.get(`${this.baseUrl}/api/lookup/materials`, { params: prm });
  }

  listMiningCompany() {
    return this.http.get(`${this.baseUrl}/api/lookup/mining-companies`);
  }

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
