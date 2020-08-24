import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import _ from 'lodash';

import { LookupService } from 'src/app/shared/services/lookup.service';
import { ReportService } from 'src/app/report/services/report.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-report-seven',
  templateUrl: './report-seven.component.html',
  styleUrls: ['./report-seven.component.css']
})
export class ReportSevenComponent implements OnInit {

  isLoading = false;
  list = [];
  total = 0;
  miningCompanyList = [];
  materialList = [];
  mining_company_id = null;
  material_id = null;
  opt = '0';
  dateFrom = null;
  dateTo = null;
  totalCount = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  sort = 'checkout_date';
  sortDir = 'desc';

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(
    private lookupService: LookupService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.lookupService.listMiningCompany().subscribe((res: any) => {
      this.miningCompanyList = res;
    }, (error) => {
      
    }, () => {
      this.isLoading = false;
    });
  }

  loadReport() {
    this.isLoading = true;
    this.reportService.list4(
      this.mining_company_id,
      this.material_id,
      this.opt,
      Helper.getDateStr(this.dateFrom), 
      Helper.getDateStr(this.dateTo),
      this.page,
      AppConstant.PAGE_SIZE,
      this.sort, this.sortDir).subscribe((res: any) => {
      this.list = res.body.data;
      this.total = res.body.total;
      const headers = res.headers;
      this.totalCount = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_COUNT));
    }, (error) => {
      
    }, () => {
      this.isLoading = false;
    });
  }

  pageChanged(event: any) {
    this.page = event.page;
    this.loadReport();
  }

  onSortBy(e) {
    if (e.sort === '' && e.dir === 'asc') {
      this.sort = 'checkout_date';
      this.sortDir = 'desc';
    }

    else {
      this.sort = e.sort;
      this.sortDir = e.dir;
    }

    this.loadReport();
  }

  onApplyFilter() {
    this.page = 1;
    this.loadReport();
  }

  onClearFilter() {
    this.mining_company_id = null;
    this.material_id = null;
  }

  onChangeMiningCompany(event) {
    this.lookupService.listMaterial(event.id).subscribe((res: any) => {
      this.materialList = res.map((k) => {
        k.label = `${k.name.toUpperCase()}`;
        return k;
      });
    })
  }
}
