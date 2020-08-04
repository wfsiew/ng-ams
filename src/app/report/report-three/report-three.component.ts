import { Component, OnInit, ViewChild } from '@angular/core';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UIChart } from 'primeng/chart';

import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-report-three',
  templateUrl: './report-three.component.html',
  styleUrls: ['./report-three.component.css']
})
export class ReportThreeComponent implements OnInit {

  data1: any;
  options1: any;
  data2: any;
  options2: any;
  plugin = ChartDataLabels;
  @ViewChild('chart', { static: false }) chart: UIChart;

  constructor() { }

  ngOnInit() {
    const colorList = Helper.getColorList([1, 2, 3, 4, 5]);

    this.data1 = {
      labels: ['2014', '2015', '2016', '2017', '2018'],
      datasets: [
        {
          label: 'Pahang',
          backgroundColor: colorList[0],
          borderColor: colorList[0],
          data: [6592609, 867126, 1394084, 1839457, 1629484]
        },
        {
          label: 'Kelantan',
          backgroundColor: colorList[1],
          borderColor: colorList[1],
          data: [526927, 112360, 83180, 77350, 96650]
        },
        {
          label: 'Johor',
          backgroundColor: colorList[2],
          borderColor: colorList[2],
          data: [1394403, 402195, 195895, 1212009, 904137]
        },
        {
          label: 'Terengganu',
          backgroundColor: colorList[3],
          borderColor: colorList[3],
          data: [636751, 196911, 193608, 734669, 717870]
        },
        {
          label: 'Kedah',
          backgroundColor: colorList[4],
          borderColor: colorList[4],
          data: [382333, 40661, 43600, 56147, 5493]
        }
      ]
    }

    this.data2 = {
      labels: ['2014', '2015', '2016', '2017', '2018'],
      datasets: [
        {
          label: 'Pahang',
          backgroundColor: colorList[0],
          borderColor: colorList[0],
          data: [61, 52, 23, 21, 26]
        },
        {
          label: 'Kelantan',
          backgroundColor: colorList[1],
          borderColor: colorList[1],
          data: [19, 18, 2, 3, 3]
        },
        {
          label: 'Johor',
          backgroundColor: colorList[2],
          borderColor: colorList[2],
          data: [19, 10, 6, 6, 4]
        },
        {
          label: 'Terengganu',
          backgroundColor: colorList[3],
          borderColor: colorList[3],
          data: [9, 8, 4, 15, 14]
        },
        {
          label: 'Kedah',
          backgroundColor: colorList[4],
          borderColor: colorList[4],
          data: [10, 7, 5, 4, 5]
        }
      ]
    }
    
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

    this.options1 = {
      title: {
        display: true,
        text: 'Bijih Besi',
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
  }
}
