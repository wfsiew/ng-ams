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

  list3(state_id, opt, days, dateFrom, dateTo) {
    let prm: HttpParams = new HttpParams()
      .set('state_id', state_id)
      .set('opt', opt)
      .set('days', days);
    if (!Helper.isEmpty(dateFrom)) {
      prm = prm.append('datefrom', dateFrom);
    }

    if (!Helper.isEmpty(dateTo)) {
      prm = prm.append('dateto', dateTo);
    }

    return this.http.get(`${this.baseUrl}/api/report/3`, { params: prm });
  }

  list4(mining_company_id, material_id, page, limit, sort, dir) {
    let prm: HttpParams = new HttpParams()
      .set('mining_company_id', mining_company_id)
      .set('material_id', material_id)
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.get(`${this.baseUrl}/api/report/4`, { params: prm, observe: 'response' });
  }
}
