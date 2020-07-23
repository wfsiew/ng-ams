import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyDetailsComponent } from './company-details/company-details.component';
import { TruckListingComponent } from './truck-listing/truck-listing.component';
import { TruckCreateComponent } from './truck-create/truck-create.component';
import { DriverListingComponent } from './driver-listing/driver-listing.component';
import { DriverCreateComponent } from './driver-create/driver-create.component';

const routes: Routes = [
  { path: 'company-details', component: CompanyDetailsComponent },
  {
    path: 'truck',
    children: [
      { path: 'list', component: TruckListingComponent },
      { path: 'create', component: TruckCreateComponent },
      { path: 'edit/:id', component: TruckCreateComponent }
    ]
  },
  {
    path: 'driver',
    children: [
      { path: 'list', component: DriverListingComponent },
      { path: 'create', component: DriverCreateComponent },
      { path: 'edit/:id', component: DriverCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
