import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportOneComponent } from './report-one/report-one.component';
import { ReportTwoComponent } from './report-two/report-two.component'
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'one', component: ReportOneComponent },
  { path: 'two', component: ReportTwoComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
