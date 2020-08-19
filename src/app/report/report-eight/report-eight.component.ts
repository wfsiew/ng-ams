import { Component, OnInit, ViewChild } from '@angular/core';

import _ from 'lodash';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-report-eight',
  templateUrl: './report-eight.component.html',
  styleUrls: ['./report-eight.component.css']
})
export class ReportEightComponent implements OnInit {

  data: any;
  plugin = ChartDataLabels;
  mth = 0;
  n = 0;
  @ViewChild('chart', { static: false }) chart: UIChart;

  options = {
    title: {
      display: true,
      text: '',
      fontSize: 16
    },
    legend: {
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        display: true,
        color: '#ffffff',
        textAlign: 'center',
        anchor: 'center',
        align: 'center',
        formatter: (x, context) => {
          if (x === 0) {
            return '';
          }

          return Number(x).toLocaleString('en-GB');
        }
      }
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Load'
          }
        }
      ],
      xAxes: [
        {
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'Mineral'
          }
        }
      ]
    }
  }

  constructor() { }

  ngOnInit() {
    this.load();
  }

  load() {
    const colorList = Helper.getColorList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const mths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const lx = _.map(mths, (x, i) => {
      return {
        label: x,
        data: [0, 0],
        backgroundColor: colorList[i],
        borderColor: colorList[i]
      }
    });

    this.data = {
      labels: ['Besi', 'Timah'],
      datasets: lx
    }

    this.refreshChart();
  }

  refreshChart() {
    setTimeout(() => {
      this.loadAuto();
    }, 2000);
  }

  loadAuto() {
    let i = this.mth;
    let o = this.chart.data.datasets[i];
    o.data[0] = o.data[0] + this.getRandom();
    o.data[1] = o.data[1] + this.getRandom();
    // this.chart.data.datasets.forEach((x) => {
    //   x.data[0] = x.data[0] + this.getRandom();
    //   x.data[1] = x.data[1] + this.getRandom();
    // });
    ++this.n;
    if (this.n === 5) {
      this.n = 0;
      this.mth += 1;
      if (this.mth === 12) {
        this.mth = 0;
      }
    }

    this.chart.refresh();
    this.refreshChart();
  }

  private getRandom() {
    let x = Math.floor(Math.random() * 6) + 5;
    return x;
  }
}
