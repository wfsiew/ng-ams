import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Helper } from 'src/app/shared/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  list1(mining_company_id, opt, days, dateFrom, dateTo) {
    let prm: HttpParams = new HttpParams()
      .set('mining_company_id', mining_company_id)
      .set('opt', opt)
      .set('days', days);
    if (!Helper.isEmpty(dateFrom)) {
      prm = prm.append('datefrom', dateFrom);
    }

    if (!Helper.isEmpty(dateTo)) {
      prm = prm.append('dateto', dateTo);
    }

    return this.http.get(`${this.baseUrl}/api/report/1`, { params: prm });
  }

  list2(opt, days, dateFrom, dateTo) {
    let prm: HttpParams = new HttpParams()
      .set('opt', opt)
      .set('days', days);
    if (!Helper.isEmpty(dateFrom)) {
      prm = prm.append('datefrom', dateFrom);
    }

    if (!Helper.isEmpty(dateTo)) {
      prm = prm.append('dateto', dateTo);
    }

    return this.http.get(`${this.baseUrl}/api/report/2`, { params: prm });
  }
}