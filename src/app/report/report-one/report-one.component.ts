import { Component, OnInit } from '@angular/core';

import _ from 'lodash';

import { LookupService } from 'src/app/shared/services/lookup.service';
import { ReportService } from 'src/app/report/services/report.service';
import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-report-one',
  templateUrl: './report-one.component.html',
  styleUrls: ['./report-one.component.css']
})
export class ReportOneComponent implements OnInit {

  isLoading = false;
  list = [];
  miningCompanyList = [];
  opt = '0';
  dateFrom = null;
  dateTo = null;
  mining_company_id = null;
  chartData = [];

  readonly isEmpty = Helper.isEmpty;

  constructor(
    private lookupService: LookupService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.lookupService.listMiningCompany().subscribe((res: any) => {
      this.miningCompanyList = res;
      this.loadReport();
    });
  }
  
  loadReport() {
    if (!this.mining_company_id) return;
    let days = '0';
    if (this.opt === '0') days = '7';
    if (this.opt === '1') days = '14';
    this.isLoading = true;
    this.reportService.list1(
      this.mining_company_id,
      this.opt,
      days,
      Helper.getDateStr(this.dateFrom), 
      Helper.getDateStr(this.dateTo)).subscribe((res: any) => {
      this.list = res;
      this.setChart();
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  setChart() {
    let lx = this.list.map((x) => {
      return {
        name: `${x.material__name} (${x.material__grade}) - ${x.sum.toLocaleString()}`,
        value: x.sum
      }
    });
    this.chartData = lx;
  }

  onApplyFilter() {
    this.loadReport();
  }

  onClearFilter() {
    this.mining_company_id = null;
    this.opt = '0';
    this.dateFrom = null;
    this.dateTo = null;
  }

  onSelect(event) {
    console.log(event)
  }

  get chartTitle() {
    let s = this.miningCompany;
    if (this.opt === '0') {
      s = `${s} - Last 7 days`;
    }

    else if (this.opt === '1') {
      s = `${s} - Last 14 days`;
    }

    else if (this.opt === '2') {
      s = `${s} - From ${Helper.getDateStr(this.dateFrom)} To ${Helper.getDateStr(this.dateTo)}`;
    }

    return s;
  }

  get miningCompany() {
    let mid = this.mining_company_id;
    let s = mid;
    if (mid === null) {
      return '';
    }

    let o = _.find(this.miningCompanyList, { id: mid });
    if (!_.isUndefined(o)) {
      s = o.name;
    }

    return s;
  }
}
