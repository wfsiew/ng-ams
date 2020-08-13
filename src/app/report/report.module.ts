import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartModule } from 'primeng/chart';

import { ReportRoutingModule } from './report-routing.module';

import { SharedComponentModules } from '../shared/components/shared-components.module';
import { ReportOneComponent } from './report-one/report-one.component';
import { ReportTwoComponent } from './report-two/report-two.component';
import { ReportThreeComponent } from './report-three/report-three.component';
import { ReportFourComponent } from './report-four/report-four.component';

import { ReportService } from './services/report.service';


@NgModule({
  declarations: [
    ReportOneComponent,
    ReportTwoComponent,
    ReportThreeComponent,
    ReportFourComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModules,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    ChartModule
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
