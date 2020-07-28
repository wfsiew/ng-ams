import { Component, OnInit } from '@angular/core';

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
  opt = '0';
  dateFrom = null;
  dateTo = null;

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
      this.list = res;
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  onApplyFilter() {
    this.load();
  }

  onClearFilter() {
    this.opt = '0';
    this.dateFrom = null;
    this.dateTo = null;
  }
}
