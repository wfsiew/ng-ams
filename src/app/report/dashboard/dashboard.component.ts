import { Component, OnInit } from '@angular/core';

import { DashboardService } from 'src/app/report/dashboard/services/dashboard.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoading = false;
  list = [];
  dateFrom = null;
  dateTo = null;

  readonly isEmpty = Helper.isEmpty;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.dashboardService.list(
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
    this.dateFrom = null;
    this.dateTo = null;
  }
}
