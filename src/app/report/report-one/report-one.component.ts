import { Component, OnInit } from '@angular/core';

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
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
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
}
