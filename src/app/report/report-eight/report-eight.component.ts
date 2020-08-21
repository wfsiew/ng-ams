import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import _ from 'lodash';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-report-eight',
  templateUrl: './report-eight.component.html',
  styleUrls: ['./report-eight.component.css']
})
export class ReportEightComponent implements OnInit, AfterViewInit {

  mth = 0;
  j = 0;
  n = 0;
  lx: number[] = [];
  data: any;
  plugin = ChartDataLabels;
  @ViewChild('chart', { static: false }) chart: UIChart;

  readonly mthlist = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  options = {
    title: {
      display: true,
      text: '',
      fontSize: 16
    },
    legend: {
      display: false,
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        display: true,
        textAlign: 'center',
        anchor: 'end',
        align: 'end',
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
          ticks: {
            max: 35,
            min: 0,
            autoSkip: false
          },
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: 'Value (RM) (Million)'
          }
        }
      ],
      xAxes: [
        {
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: 'IRON ORE - FINE'
          }
        }
      ]
    }
  }

  constructor() { }

  ngAfterViewInit() {
    this.load();
  }

  ngOnInit() {
  }

  load() {
    this.initChart();
    this.lx = this.getRandomIndexList();
    this.startProc1();
  }

  initChart() {
    const colorList = Helper.getColorList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    const labels = ['Johor', 'Kedah', 'Kelantan', 'W.P.', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'];

    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'IRON ORE - FINE',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: colorList,
          borderColor: colorList
        }
      ]
    }

    this.chart.data = this.data;
    this.chart.options.title.text = `Report For Month of ${this.mthlist[this.mth]}`;
    this.chart.reinit();
  }

  startProc1() {
    setTimeout(() => {
      let o = this.chart.data.datasets[0];
      let i = this.lx[this.j];
      o.data[i] = o.data[i] + this.getRandom();
      this.chart.refresh();
      ++this.j;

      if (this.j < this.lx.length) {
        this.startProc1();
      }

      else {
        this.j = 0;
        this.startProc2();
      }
    }, 1000);
  }

  startProc2() {
    ++this.n;
    if (this.n === 1) {
      this.n = 0;
      ++this.mth;
      if (this.mth === 12) {
        this.mth = 0;
      }

      setTimeout(() => {
        this.initChart();
        this.lx = this.getRandomIndexList();
        this.startProc1();
      }, 10000);
    }

    else {
      setTimeout(() => {
        this.lx = this.getRandomIndexList();
        this.startProc1();
      }, 5000);
    }
  }

  refreshChart() {
    setTimeout(() => {
      this.loadAuto();
    }, 2000);
  }

  loadAuto() {
    let i = this.getRandomLabel();
    let o = this.chart.data.datasets[0];
    o.data[i] = o.data[i] + this.getRandom();
    // this.chart.data.datasets.forEach((x) => {
    //   x.data[0] = x.data[0] + this.getRandom();
    //   x.data[1] = x.data[1] + this.getRandom();
    // });

    // ++this.n;
    // if (this.n === 2) {
    //   this.n = 0;
    //   this.mth += 1;
    //   if (this.mth === 12) {
    //     this.mth = 0;
    //   }
    // }

    this.chart.refresh();
    this.refreshChart();
  }

  getRandomIndexList(): number[] {
    let lx: number[] = [];
    while (lx.length < 15) {
      let k = this.getRandomLabel();
      if (lx.indexOf(k) < 0) {
        lx.push(k);
      }
    }

    return lx;
  }

  getRandom() {
    let x = Math.floor(Math.random() * 9) + 2;
    return x;
  }

  getRandomLabel() {
    let x = Math.floor(Math.random() * 15);
    return x;
  }
}
