import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListingComponent } from './user/user-listing/user-listing.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { CountryListingComponent } from './country/country-listing/country-listing.component';
import { CountryCreateComponent } from './country/country-create/country-create.component';
import { StateListingComponent } from './state/state-listing/state-listing.component';
import { StateCreateComponent } from './state/state-create/state-create.component';
import { BuyerListingComponent } from './buyer/buyer-listing/buyer-listing.component';
import { BuyerCreateComponent } from './buyer/buyer-create/buyer-create.component';
import { TruckListingComponent } from './buyer/truck-listing/truck-listing.component';
import { TruckCreateComponent } from './buyer/truck-create/truck-create.component';
import { DriverListingComponent } from './buyer/driver-listing/driver-listing.component';
import { DriverCreateComponent } from './buyer/driver-create/driver-create.component';
import { UserListingComponent as BuyerUserListingComponent } from './buyer/user-listing/user-listing.component';
import { MiningCompanyListingComponent } from './mining-company/mining-company-listing/mining-company-listing.component';
import { MiningCompanyCreateComponent } from './mining-company/mining-company-create/mining-company-create.component';
import { UserListingComponent as MiningCompanyUserListingComponent } from './mining-company/user-listing/user-listing.component';
import { MaterialListingComponent as MiningMaterialListingComponent } from './mining-company/material-listing/material-listing.component';
import { MaterialListingComponent } from './material/material-listing/material-listing.component';
import { MaterialCreateComponent } from './material/material-create/material-create.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'list', component: UserListingComponent },
      { path: 'create', component: UserCreateComponent },
      { path: 'edit/:id', component: UserCreateComponent }
    ]
  },
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
      },
      {
        path: 'driver/:buyer_id',
        children: [
          { path: 'list', component: DriverListingComponent },
          { path: 'create', component: DriverCreateComponent },
          { path: 'edit/:id', component: DriverCreateComponent }
        ]
      },
      {
        path: 'user/:buyer_id',
        children: [
          { path: 'list', component: BuyerUserListingComponent }
        ]
      }
    ]
  },
  {
    path: 'mining-company',
    children: [
      { path: 'list', component: MiningCompanyListingComponent },
      { path: 'create', component: MiningCompanyCreateComponent },
      { path: 'edit/:id', component: MiningCompanyCreateComponent },
      {
        path: 'user/:mining_company_id',
        children: [
          { path: 'list', component: MiningCompanyUserListingComponent }
        ]
      },
      {
        path: 'material/:mining_company_id',
        children: [
          { path: 'list', component: MiningMaterialListingComponent }
        ]
      }
    ]
  },
  {
    path: 'material',
    children: [
      { path: 'list', component: MaterialListingComponent },
      { path: 'create', component: MaterialCreateComponent },
      { path: 'edit/:id', component: MaterialCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
