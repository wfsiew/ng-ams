import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryListingComponent } from './country/country-listing/country-listing.component';
import { CountryCreateComponent } from './country/country-create/country-create.component';
import { StateListingComponent } from './state/state-listing/state-listing.component';
import { StateCreateComponent } from './state/state-create/state-create.component';
import { BuyerListingComponent } from './buyer/buyer-listing/buyer-listing.component';
import { BuyerCreateComponent } from './buyer/buyer-create/buyer-create.component';
import { TruckListingComponent } from './buyer/truck-listing/truck-listing.component';
import { TruckCreateComponent } from './buyer/truck-create/truck-create.component';
import { MiningCompanyListingComponent } from './mining-company/mining-company-listing/mining-company-listing.component';
import { MiningCompanyCreateComponent } from './mining-company/mining-company-create/mining-company-create.component';

const routes: Routes = [
  {
    path: 'country',
    children: [
      { path: 'list', component: CountryListingComponent },
      { path: 'create', component: CountryCreateComponent },
      { path: 'edit/:id', component: CountryCreateComponent }
    ]
  },
  {
    path: 'state',
    children: [
      { path: 'list', component: StateListingComponent },
      { path: 'create', component: StateCreateComponent },
      { path: 'edit/:id', component: StateCreateComponent }
    ]
  },
  {
    path: 'buyer',
    children: [
      { path: 'list', component: BuyerListingComponent },
      { path: 'create', component: BuyerCreateComponent },
      { path: 'edit/:id', component: BuyerCreateComponent },
      {
        path: 'truck/:buyer_id',
        children: [
          { path: 'list', component: TruckListingComponent },
          { path: 'create', component: TruckCreateComponent },
          { path: 'edit/:id', component: TruckCreateComponent }
        ]
      }
    ]
  },
  {
    path: 'mining-company',
    children: [
      { path: 'list', component: MiningCompanyListingComponent },
      { path: 'create', component: MiningCompanyCreateComponent },
      { path: 'edit/:id', component: MiningCompanyCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
