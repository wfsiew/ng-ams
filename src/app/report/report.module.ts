import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ChartModule } from 'primeng/chart';

import { ReportRoutingModule } from './report-routing.module';

import { SharedComponentModules } from '../shared/components/shared-components.module';
import { ReportOneComponent } from './report-one/report-one.component';
import { ReportTwoComponent } from './report-two/report-two.component';
import { ReportThreeComponent } from './report-three/report-three.component';
import { ReportFourComponent } from './report-four/report-four.component';
import { ReportFiveComponent } from './report-five/report-five.component';
import { ReportSixComponent } from './report-six/report-six.component';
import { ReportSevenComponent } from './report-seven/report-seven.component';
import { ReportEightComponent } from './report-eight/report-eight.component';

import { ReportService } from './services/report.service';


@NgModule({
  declarations: [
    ReportOneComponent,
    ReportTwoComponent,
    ReportThreeComponent,
    ReportFourComponent,
    ReportFiveComponent,
    ReportSixComponent,
    ReportSevenComponent,
    ReportEightComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModules,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ChartModule
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
