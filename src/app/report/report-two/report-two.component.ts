import { Component, OnInit, ViewChild } from '@angular/core';

import _ from 'lodash';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

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
  chartData: any;
  options: any;
  plugin = ChartDataLabels;
  @ViewChild('chart', { static: false }) chart: UIChart;

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
    const labels = _.map(this.list, (x) => {
      let pct = Helper.getPercentage(x.sum, this.total);
      return `${x.material__name} (${x.material__grade}) - ${pct}`;
    });

    const colorList = Helper.getColorList(this.list);

    const data = _.map(this.list, (x) => {
      return x.sum;
    });
    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'First Dataset',
          data: data,
          backgroundColor: colorList
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
            return Helper.getPercentage(x, this.total);
          }
        }
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
