import { Component, OnInit } from '@angular/core';

import _ from 'lodash';

import { ReportService } from 'src/app/report/services/report.service';
import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-report-two',
  templateUrl: './report-two.component.html',
  styleUrls: ['./report-two.component.css']
})
export class ReportTwoComponent implements OnInit {

  isLoading = false;
  list = [];
  total = 0;
  opt = '0';
  dateFrom = null;
  dateTo = null;
  chartData = [];

  readonly isEmpty = Helper.isEmpty;

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.load();
  }
  
  load() {
    let days = '0';
    if (this.opt === '0') days = '7';
    if (this.opt === '1') days = '14';
    this.isLoading = true;
    this.reportService.list2(
      this.opt,
      days,
      Helper.getDateStr(this.dateFrom), 
      Helper.getDateStr(this.dateTo)).subscribe((res: any) => {
        this.list = res.data;
        this.total = res.total;
        this.setChart();
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  setChart() {
    let lx = _.map(this.list, (x) => {
      let pct = x.sum * 100 / this.total;
      pct = Math.trunc(pct);
      return {
        name: `${x.material__name} (${x.material__grade}) - ${pct} %`,
        value: x.sum
      }
    });
    this.chartData = lx;
  }

  onApplyFilter() {
    this.load();
  }

  onClearFilter() {
    this.opt = '0';
    this.dateFrom = null;
    this.dateTo = null;
  }

  get chartTitle() {
    let s = 'Summary';
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
}
