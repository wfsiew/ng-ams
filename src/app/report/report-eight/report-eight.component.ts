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

    this.data = {
      labels: ['Besi', 'Timah'],
      datasets: [
        {
          label: 'Jan',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[0],
          borderColor: colorList[0]
        },
        {
          label: 'Feb',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[1],
          borderColor: colorList[1]
        },
        {
          label: 'Mar',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[2],
          borderColor: colorList[2]
        },
        {
          label: 'Apr',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[3],
          borderColor: colorList[3]
        },
        {
          label: 'May',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[4],
          borderColor: colorList[4]
        },
        {
          label: 'June',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[5],
          borderColor: colorList[5]
        },
        {
          label: 'July',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[6],
          borderColor: colorList[6]
        },
        {
          label: 'Aug',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[7],
          borderColor: colorList[7]
        },
        {
          label: 'Sep',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[8],
          borderColor: colorList[8]
        },
        {
          label: 'Oct',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[9],
          borderColor: colorList[9]
        },
        {
          label: 'Nov',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[10],
          borderColor: colorList[10]
        },
        {
          label: 'Dec',
          data: [0, 0],
          barThickness: 100,
          backgroundColor: colorList[11],
          borderColor: colorList[11]
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
    let i = this.mth;
    let o = this.chart.data.datasets[i];
    o.data[0] = o.data[0] + this.getRandom();
    o.data[1] = o.data[1] + this.getRandom();
    // this.chart.data.datasets.forEach((x) => {
    //   x.data[0] = x.data[0] + this.getRandom();
    //   x.data[1] = x.data[1] + this.getRandom();
    // });
    this.mth += 1;
    if (this.mth === 12) {
      this.mth = 0;
    }

    this.chart.refresh();
    this.refreshChart();
  }

  private getRandom() {
    let x = Math.floor(Math.random() * 6) + 5;
    return x;
  }
}
