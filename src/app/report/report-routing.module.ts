import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportOneComponent } from './report-one/report-one.component';
import { ReportTwoComponent } from './report-two/report-two.component'

const routes: Routes = [
  { path: 'one', component: ReportOneComponent },
  { path: 'two', component: ReportTwoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
