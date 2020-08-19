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
  @ViewChild('chart', { static: false }) chart: UIChart;

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
          stacked: false,
          scaleLabel: {
            display: true,
            labelString: 'Value (RM) (1000)'
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

  ngOnInit() {
    this.load();
  }

  load() {
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

    this.refreshChart();
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

  private getRandom() {
    let x = Math.floor(Math.random() * 6) + 5;
    return x;
  }

  private getRandomLabel() {
    let x = Math.floor(Math.random() * 15);
    return x;
  }
}
