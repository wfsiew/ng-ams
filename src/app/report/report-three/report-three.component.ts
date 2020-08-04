import { Component, OnInit, ViewChild } from '@angular/core';

import _ from 'lodash';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

import { Helper } from 'src/app/shared/utils/helper';
import { data_besi_ton, data_besi_lombong } from './data';

@Component({
  selector: 'app-report-three',
  templateUrl: './report-three.component.html',
  styleUrls: ['./report-three.component.css']
})
export class ReportThreeComponent implements OnInit {

  opt = '0';
  data1: any;
  data2: any;
  plugin = ChartDataLabels;
  @ViewChild('chart', { static: false }) chart: UIChart;

  options1 = {
    title: {
      display: true,
      text: 'Bijih Besi 1',
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
            labelString: 'Tahun'
          }
        }
      ]
    }
  };

  options2 = {
    title: {
      display: true,
      text: 'Bijih Besi 2',
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
            labelString: 'Lombong'
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Tahun'
          }
        }
      ]
    }
  };

  constructor() { }

  ngOnInit() {
    const colorList = Helper.getColorList([1, 2, 3, 4, 5]);

    this.load();

    
    
    const data1 = {
      labels: ['Pahang', 'Kelantan', 'Johor', 'Terengganu', 'Kedah'],
      datasets: [
        {
          label: '2014',
          backgroundColor: colorList[0],
          borderColor: colorList[0],
          data: [6592609, 526927, 1394403, 636751, 382333],
          count: [61, 19, 19, 9, 10]
        },
        {
          label: '2015',
          backgroundColor: colorList[1],
          borderColor: colorList[1],
          data: [867126, 112360, 402195, 196911, 40661],
          count: [52, 18, 10, 8, 7]
        },
        {
          label: '2016',
          backgroundColor: colorList[2],
          borderColor: colorList[2],
          data: [1394084, 83180, 195895, 193608, 43600],
          count: [23, 2, 6, 4, 5]
        },
        {
          label: '2017',
          backgroundColor: colorList[3],
          borderColor: colorList[3],
          data: [1839457, 77350, 1212009, 734669, 56147],
          count: [21, 3, 6, 15, 4]
        },
        {
          label: '2018',
          backgroundColor: colorList[4],
          borderColor: colorList[4],
          data: [1629484, 96650, 904137, 717870, 5493],
          count: [26, 3, 4, 14, 5]
        }
      ]
    }

    
  }

  load() {
    this.data1 = this.getData1ByTon();
    this.data2 = this.getData1ByMine();
  }

  getData1ByTon() {
    if (this.opt === '0') {
      const colorList = Helper.getColorList([1, 2, 3, 4, 5]);
      const lx = _.map(data_besi_ton.datasets, (x, i) => {
        return {
          label: x.label,
          data: _.slice(x.data, 2),
          backgroundColor: colorList[i],
          borderColor: colorList[i]
        }
      });
      return {
        labels: _.slice(data_besi_ton.labels, 2),
        datasets: lx
      };
    }

    else {

    }
  }

  getData1ByMine() {
    if (this.opt === '0') {
      const colorList = Helper.getColorList([1, 2, 3, 4, 5]);
      const lx = _.map(data_besi_lombong.datasets, (x, i) => {
        return {
          label: x.label,
          data: _.slice(x.data, 2),
          backgroundColor: colorList[i],
          borderColor: colorList[i]
        }
      });
      return {
        labels: _.slice(data_besi_lombong.labels, 2),
        datasets: lx
      };
    }
  }
}
