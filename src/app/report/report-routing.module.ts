import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportOneComponent } from './report-one/report-one.component';
import { ReportTwoComponent } from './report-two/report-two.component';
import { ReportThreeComponent } from './report-three/report-three.component';
import { ReportFourComponent } from './report-four/report-four.component';
import { ReportFiveComponent } from './report-five/report-five.component';
import { ReportSixComponent } from './report-six/report-six.component';
import { ReportSevenComponent } from './report-seven/report-seven.component';
import { ReportEightComponent } from './report-eight/report-eight.component';

const routes: Routes = [
  { path: 'one', component: ReportOneComponent },
  { path: 'two', component: ReportTwoComponent },
  { path: 'three', component: ReportThreeComponent },
  { path: 'four', component: ReportFourComponent },
  { path: 'five', component: ReportFiveComponent },
  { path: 'six', component: ReportSixComponent },
  { path: 'seven', component: ReportSevenComponent },
  { path: 'eight', component: ReportEightComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
