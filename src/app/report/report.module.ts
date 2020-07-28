import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReportRoutingModule } from './report-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedComponentModules } from '../shared/components/shared-components.module';
import { ReportOneComponent } from './report-one/report-one.component';
import { ReportTwoComponent } from './report-two/report-two.component';

import { ReportService } from './services/report.service';


@NgModule({
  declarations: [
    ReportOneComponent, 
    ReportTwoComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModules,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgxChartsModule
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
