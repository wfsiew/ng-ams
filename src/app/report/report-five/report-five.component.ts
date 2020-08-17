import { Component, OnInit, ViewChild } from '@angular/core';

import _ from 'lodash';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-report-five',
  templateUrl: './report-five.component.html',
  styleUrls: ['./report-five.component.css']
})
export class ReportFiveComponent implements OnInit {

  mine = '0';
  year = 2018;
  data: any;
  plugin = ChartDataLabels;
  @ViewChild('chart', { static: false }) chart: UIChart;

  yearList = [
    { id: 2018, name: '2018' }
  ];

  mineList = [
    { id: '0', name: 'Aggregates' },
    { id: '1', name: 'Clay (include shale)' },
    { id: '2', name: 'Earth Materials' },
    { id: '3', name: 'Sand and Gravel' }
  ];

  options = {
    title: {
      display: true,
      text: 'Aggregates',
      fontSize: 16
    },
    legend: {
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        display: true,
        textAlign: 'center',
        anchor: 'end',
        align: 'end',
        formatter: (x, context) => {
          return Number(x).toLocaleString('en-GB');
        }
      }
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Tan'
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'State'
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
    if (this.mine === '0') {
      this.data = this.getData0();
    }

    else if (this.mine === '1') {
      this.data = this.getData1();
    }

    else if (this.mine === '2') {
      this.data = this.getData2();
    }

    else if (this.mine === '3') {
      this.data = this.getData3();
    }

    if (this.chart) {
      this.chart.data = this.data;
      this.chart.options.title.text = this.chartTitle;

      this.chart.reinit();
    }
  }

  onApplyFilter(chart) {
    this.chart = chart;
    this.load();
  }

  get chartTitle() {
    let x = _.find(this.mineList, { 'id': this.mine });
    return x.name;
  }

  private getData3() {
    return {
      labels: ['Johor', 'Kedah', 'Kelantan', 'W.P.', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'],
      datasets: [
        {
          label: '2018',
          data: [102, 119, 93, 0, 11, 31, 158, 91, 0, 1, 0, 81, 26, 92, 78],
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    }
  }

  private getData2() {
    return {
      labels: ['Johor', 'Kedah', 'Kelantan', 'W.P.', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'],
      datasets: [
        {
          label: '2018',
          data: [174, 104, 91, 14, 100, 80, 72, 160, 12, 2, 15, 45, 90, 91, 297],
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    }
  }

  private getData1() {
    return {
      labels: ['Johor', 'Kedah', 'Kelantan', 'W.P.', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'],
      datasets: [
        {
          label: '2018',
          data: [39, 7, 0, 0, 1, 8, 8, 14, 1, 0, 0, 9, 44, 24, 4],
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    }
  }

  private getData0() {
    return {
      labels: ['Johor', 'Kedah', 'Kelantan', 'W.P.', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'],
      datasets: [
        {
          label: '2018',
          data: [57, 19, 12, 0, 11, 18, 30, 57, 3, 16, 0, 52, 65, 26, 15],
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    }
  }
}
