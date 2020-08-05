import { Component, OnInit, ViewChild } from '@angular/core';

import _ from 'lodash';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

import { Helper } from 'src/app/shared/utils/helper';
import { data_besi_ton, data_besi_lombong, data_timah_ton, data_timah_lombong } from './data';

@Component({
  selector: 'app-report-three',
  templateUrl: './report-three.component.html',
  styleUrls: ['./report-three.component.css']
})
export class ReportThreeComponent implements OnInit {

  mine = '0';
  opt = '0';
  tab = 0;
  data: any;
  data1: any;
  data2: any;
  plugin = ChartDataLabels;
  @ViewChild('chart', { static: false }) chart: UIChart;

  mineList = [
    { id: '0', name: 'Besi' },
    { id: '1', name: 'Timah' }
  ];

  options = {
    title: {
      display: true,
      text: 'Besi - Jumlah Tan (Negeri) dari 2016 - 2018',
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
    this.load();
  }

  load() {
    if (this.mine === '0') {
      if (this.tab === 0) {
        this.data = this.getData1ByTon();
      }

      else if (this.tab === 1) {
        this.data = this.getData1ByMine();
      }
    }
    
    else if (this.mine === '1') {
      if (this.tab === 0) {
        this.data = this.getData2ByTon();
      }

      else {
        this.data = this.getData2ByMine();
      }
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

  onTab(i) {
    if (this.tab !== i) {

    }

    this.tab = i;
    this.load();
    return false;
  }

  get chartTitle() {
    let s = '';
    if (this.mine === '0') {
      if (this.tab === 0) {
        if (this.opt === '0') {
          s = 'Besi - Jumlah Tan (Negeri) dari 2016 - 2018';
        }
        
        else {
          s = 'Besi - Jumlah Tan (Negeri) dari 2014 - 2018';
        }
      }
      
      else if (this.tab === 1) {
        if (this.opt === '0') {
          s = 'Besi - Jumlah Lombong (Negeri) dari 2016 - 2018';
        }
        
        else {
          s = 'Besi - Jumlah Lombong (Negeri) dari 2014 - 2018';
        }
      }
    }

    else if (this.mine === '1') {
      if (this.tab === 0) {
        if (this.opt === '0') {
          s = 'Timah - Jumlah Tan (Negeri) dari 2017 - 2019';
        }
        
        else {
          s = 'Timah - Jumlah Tan (Negeri) dari 2015 - 2019';
        }
      }

      else if (this.tab === 1) {
        if (this.opt === '0') {
          s = 'Timah - Jumlah Lombong (Negeri) dari 2017 - 2019';
        }
        
        else {
          s = 'Timah - Jumlah Lombong (Negeri) dari 2015 - 2019';
        }
      }
    }

    return s;
  }

  private getData1ByTon() {
    const colorList = Helper.getColorList([1, 2, 3, 4, 5]);

    if (this.opt === '0') {
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
      const lx = _.map(data_besi_ton.datasets, (x, i) => {
        return {
          label: x.label,
          data: x.data,
          backgroundColor: colorList[i],
          borderColor: colorList[i]
        }
      });
      return {
        labels: data_besi_ton.labels,
        datasets: lx
      };
    }
  }

  private getData1ByMine() {
    const colorList = Helper.getColorList([1, 2, 3, 4, 5]);

    if (this.opt === '0') {
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

    else {
      const lx = _.map(data_besi_lombong.datasets, (x, i) => {
        return {
          label: x.label,
          data: x.data,
          backgroundColor: colorList[i],
          borderColor: colorList[i]
        }
      });
      return {
        labels: data_besi_lombong.labels,
        datasets: lx
      };
    }
  }

  private getData2ByTon() {
    const colorList = Helper.getColorList([1, 2, 3, 4]);

    if (this.opt === '0') {
      const lx = _.map(data_timah_ton.datasets, (x, i) => {
        return {
          label: x.label,
          data: _.slice(x.data, 2),
          backgroundColor: colorList[i],
          borderColor: colorList[i]
        }
      });
      return {
        labels: _.slice(data_timah_ton.labels, 2),
        datasets: lx
      };
    }

    else {
      const lx = _.map(data_timah_ton.datasets, (x, i) => {
        return {
          label: x.label,
          data: x.data,
          backgroundColor: colorList[i],
          borderColor: colorList[i]
        }
      });
      return {
        labels: data_timah_ton.labels,
        datasets: lx
      };
    }
  }

  private getData2ByMine() {
    const colorList = Helper.getColorList([1, 2, 3, 4]);

    if (this.opt === '0') {
      const lx = _.map(data_timah_lombong.datasets, (x, i) => {
        return {
          label: x.label,
          data: _.slice(x.data, 2),
          backgroundColor: colorList[i],
          borderColor: colorList[i]
        }
      });
      return {
        labels: _.slice(data_timah_lombong.labels, 2),
        datasets: lx
      };
    }

    else {
      const lx = _.map(data_timah_lombong.datasets, (x, i) => {
        return {
          label: x.label,
          data: x.data,
          backgroundColor: colorList[i],
          borderColor: colorList[i]
        }
      });
      return {
        labels: data_timah_lombong.labels,
        datasets: lx
      };
    }
  }
}
