import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DeliveryOrderListingComponent } from './delivery-order-listing/delivery-order-listing.component';
import { PermitDetailComponent } from './permit-detail/permit-detail.component';

const routes: Routes = [
  { path: 'company-details', component: CompanyDetailsComponent },
  {
    path: 'delivery-order',
    children: [
      { path: 'list', component: DeliveryOrderListingComponent }
    ]
  },
  { path: 'permit/:id', component: PermitDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiningCompanyRoutingModule { }
