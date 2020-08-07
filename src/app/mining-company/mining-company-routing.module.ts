import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DeliveryOrderListingComponent } from './delivery-order-listing/delivery-order-listing.component';
import { DeliveryOrderCreateComponent } from './delivery-order-create/delivery-order-create.component';
import { PermitDetailComponent } from './permit-detail/permit-detail.component';
import { BuyerListingComponent } from 'src/app/setup/buyer/buyer-listing/buyer-listing.component';
import { BuyerCreateComponent } from 'src/app/setup/buyer/buyer-create/buyer-create.component';
import { TruckListingComponent } from 'src/app/setup/buyer/truck-listing/truck-listing.component';
import { TruckCreateComponent } from 'src/app/setup/buyer/truck-create/truck-create.component';
import { DriverListingComponent } from 'src/app/setup/buyer/driver-listing/driver-listing.component';
import { DriverCreateComponent } from 'src/app/setup/buyer/driver-create/driver-create.component';
import { UserListingComponent as BuyerUserListingComponent } from 'src/app/setup/buyer/user-listing/user-listing.component';
import { PurchaseOrderListingComponent } from './purchase-order-listing/purchase-order-listing.component';
import { PurchaseOrderCreateComponent } from './purchase-order-create/purchase-order-create.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';

const routes: Routes = [
  { path: 'company-details', component: CompanyDetailsComponent },
  {
    path: 'delivery-order',
    children: [
      { path: 'list', component: DeliveryOrderListingComponent },
      { path: 'create', component: DeliveryOrderCreateComponent },
      { path: 'edit/:id', component: DeliveryOrderCreateComponent }
    ]
  },
  { path: 'permit/:id', component: PermitDetailComponent },
  {
    path: 'purchase-order',
    children: [
      { path: 'list', component: PurchaseOrderListingComponent },
      { path: 'create', component: PurchaseOrderCreateComponent },
      { path: 'detail/:id', component: PurchaseOrderDetailComponent }
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiningCompanyRoutingModule { }
