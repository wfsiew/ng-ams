import { Component, OnInit, ViewChild } from '@angular/core';

import _ from 'lodash';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-report-six',
  templateUrl: './report-six.component.html',
  styleUrls: ['./report-six.component.css']
})
export class ReportSixComponent implements OnInit {

  mine = '0';
  year = 2018;
  opt = '0';
  data: any;
  plugin = ChartDataLabels;
  @ViewChild('chart', { static: false }) chart: UIChart;

  yearList = [
    { id: 2018, name: '2018' }
  ];

  mineList = [
    { id: '0', name: 'Non-Metalic' },
    { id: '1', name: 'Metalic' }
  ];

  options = {
    title: {
      display: true,
      text: 'Non - Metalic',
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
            labelString: 'Quantity (tonnes)'
          }
        }
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Commodity'
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
      if (this.opt === '0') {
        this.data = this.getData0Quantity();
      }

      else if (this.opt === '1') {
        this.data = this.getData0Value();
      }
    }

    else if (this.mine === '1') {
      if (this.opt === '0') {
        this.data = this.getData1Quantity();
      }

      else if (this.opt === '1') {
        this.data = this.getData1Value();
      }
    }

    if (this.chart) {
      this.chart.data = this.data;
      this.chart.options.title.text = this.chartTitle;

      if (this.opt === '0') {
        this.chart.options.scales.yAxes[0].scaleLabel.labelString = 'Quantity (tonnes)';
      }

      else if (this.opt === '1') {
        this.chart.options.scales.yAxes[0].scaleLabel.labelString = 'Value (RM)';
      }
      this.chart.reinit();
    }
  }

  onApplyFilter(chart) {
    this.chart = chart;
    this.load();
  }

  get chartTitle() {
    let s = '';
    if (this.mine === '0') {
      s = 'Non - Metalic';
    }

    else {
      s = 'Metalic';
    }

    return s;
  }

  private getData0Quantity() {
    return {
      labels: ['Aggregates', 'Barytes', 'Bentonite', 'Clay & Other Clays', 'Dimension Stone', 'Feldspar', 'Gypsum', 'Kaolin', 'Limestone Flux', 'Mica (Crude)', 'Phosphate', 'Sand & Gravel', 'Silica Sand & Quartz Sand', 'Sulphur', 'Talc'],
      datasets: [
        {
          label: '2018',
          data: [6053314.83, 3263.34, 811.48, 861991.19, 441295.71, 43900.58, 5084.98, 152222.35, 1728,951.59, 720.00, 595.34, 1356571.06, 337070.75, 6450.70, 1266.93],
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    }
  }

  private getData0Value() {
    return {
      labels: ['Aggregates', 'Barytes', 'Bentonite', 'Clay & Other Clays', 'Dimension Stone', 'Feldspar', 'Gypsum', 'Kaolin', 'Limestone Flux', 'Mica (Crude)', 'Phosphate', 'Sand & Gravel', 'Silica Sand & Quartz Sand', 'Sulphur', 'Talc'],
      datasets: [
        {
          label: '2018',
          data: [230637623, 2287034, 1191852, 108783719, 21375818, 15982626, 5032583, 48861677, 213720804, 221033, 319441, 3530497, 34590208, 6050325, 2392183],
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    }
  }

  private getData1Quantity() {
    return {
      labels: ['Antimony', 'Bauxite', 'Chromium', 'Copper Ores', 'Ilmenite', 'Iron Ores', 'Lead Ores', 'Manganese', 'Thorium Ores', 'Silver', 'Tin Ores', 'Zinc Ores', 'Zirconium Ores'],
      datasets: [
        {
          label: '2018',
          data: [27.52, 525217.19, 24.00, 185322.11, 16342.15, 23314027.23, 15790.31, 488581.40, 50.76, 1195.29, 0.80, 2406.50, 40452.04],
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    }
  }

  private getData1Value() {
    return {
      labels: ['Antimony', 'Bauxite', 'Chromium', 'Copper Ores', 'Ilmenite', 'Iron Ores', 'Lead Ores', 'Manganese', 'Thorium Ores', 'Silver', 'Tin Ores', 'Zinc Ores', 'Zirconium Ores'],
      datasets: [
        {
          label: '2018',
          data: [207834, 70204988, 51388, 1072933942, 15836347, 3446720362, 28528888, 93120068, 668296, 1091285, 77250, 2544103, 361253588],
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    }
  }
}
