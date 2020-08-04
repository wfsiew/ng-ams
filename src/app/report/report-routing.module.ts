import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportOneComponent } from './report-one/report-one.component';
import { ReportTwoComponent } from './report-two/report-two.component';
import { ReportThreeComponent } from './report-three/report-three.component';

const routes: Routes = [
  { path: 'one', component: ReportOneComponent },
  { path: 'two', component: ReportTwoComponent },
  { path: 'three', component: ReportThreeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
