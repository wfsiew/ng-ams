import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Helper } from 'src/app/shared/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  list(dateFrom, dateTo) {
    let prm: HttpParams = new HttpParams();
    if (!Helper.isEmpty(dateFrom)) {
      prm = prm.append('datefrom', dateFrom);
    }

    if (!Helper.isEmpty(dateTo)) {
      prm = prm.append('dateto', dateTo);
    }

    return this.http.get(`${this.baseUrl}/api/dashboard`, { params: prm });
  }
}
