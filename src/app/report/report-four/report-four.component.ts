import { Component, OnInit, ViewChild } from '@angular/core';

import _ from 'lodash';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

import { LookupService } from 'src/app/shared/services/lookup.service';
import { ReportService } from 'src/app/report/services/report.service';
import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-report-four',
  templateUrl: './report-four.component.html',
  styleUrls: ['./report-four.component.css']
})
export class ReportFourComponent implements OnInit {

  isLoading = false;
  list = [];
  count = 0;
  stateList = [];
  opt = '3';
  dateFrom = null;
  dateTo = null;
  state_id = null;
  chartData: any;
  options: any;
  plugin = ChartDataLabels;
  @ViewChild('chart', { static: false }) chart: UIChart;

  readonly isEmpty = Helper.isEmpty;

  constructor(
    private lookupService: LookupService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.lookupService.listCountry().subscribe((res: any) => {
      const country_id = res[0].id;
      this.lookupService.listStates(country_id).subscribe((res: any) => {
        this.stateList = res;
      });
    });
  }

  loadReport() {
    if (!this.state_id) return;
    let days = '0';
    if (this.opt === '0') days = '7';
    if (this.opt === '1') days = '14';
    this.isLoading = true;
    this.reportService.list3(
      this.state_id,
      this.opt,
      days,
      Helper.getDateStr(this.dateFrom), 
      Helper.getDateStr(this.dateTo)).subscribe((res: any) => {
        this.list = res.data;
        this.count = res.count;
        this.setChart();
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  setChart() {
    const labels = _.map(this.list, (x) => {
      return x.do_master__issue_from__name;
    });

    const data = _.map(this.list, (x) => {
      return x.count;
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'No. of Permit',
          data: data,
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    };

    this.options = {
      title: {
        display: true,
        text: this.chartTitle,
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      },
      plugins: {
        datalabels: {
          color: '#ffffff',
          formatter: (x, context) => {
            return `${x}`;
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0
          }
        }]
      }
    };

    if (this.chart) {
      this.chart.data = this.chartData;
      this.chart.options.title.text = this.chartTitle;
      this.chart.reinit();
    }
  }

  onApplyFilter(chart) {
    this.chart = chart;
    this.loadReport();
  }

  onClearFilter() {
    this.state_id = null;
    this.opt = '3';
    this.dateFrom = null;
    this.dateTo = null;
  }

  get chartTitle() {
    let s = this.state;
    if (this.opt === '0') {
      s = `${s} - Last 7 days`;
    }

    else if (this.opt === '1') {
      s = `${s} - Last 14 days`;
    }

    else if (this.opt === '3') {
      s = `${s} - Today`;
    }

    else if (this.opt === '2') {
      s = `${s} - From ${Helper.getDateStr(this.dateFrom)} To ${Helper.getDateStr(this.dateTo)}`;
    }

    return s;
  }

  get state() {
    let sid = this.state_id;
    let s = sid;
    if (!sid) {
      return '';
    }

    let o = _.find(this.stateList, { id: sid });
    if (!_.isUndefined(o)) {
      s = o.name;
    }

    return s;
  }
}
