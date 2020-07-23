import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { BuyerRoutingModule } from './buyer-routing.module';

import { SharedComponentModules } from '../shared/components/shared-components.module';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { TruckListingComponent } from './truck-listing/truck-listing.component';
import { TruckCreateComponent } from './truck-create/truck-create.component';
import { DriverListingComponent } from './driver-listing/driver-listing.component';
import { DriverCreateComponent } from './driver-create/driver-create.component';
import { PurchaseOrderListingComponent } from './purchase-order-listing/purchase-order-listing.component';
import { PurchaseOrderCreateComponent } from './purchase-order-create/purchase-order-create.component';

import { CountryService } from 'src/app/setup/country/services/country.service';
import { StateService } from 'src/app/setup/state/services/state.service';
import { BuyerService } from 'src/app/setup/buyer/services/buyer.service';
import { TruckService } from 'src/app/setup/buyer/services/truck.service';
import { DriverService } from 'src/app/setup/buyer/services/driver.service';
import { MaterialService } from 'src/app/setup/material/services/material.service';
import { PurchaseOrderService } from './services/purchase-order.service';


@NgModule({
  declarations: [
    CompanyDetailsComponent,
    TruckListingComponent,
    TruckCreateComponent,
    DriverListingComponent,
    DriverCreateComponent,
    PurchaseOrderListingComponent,
    PurchaseOrderCreateComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModules,
    NgSelectModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    CountryService,
    StateService,
    BuyerService,
    TruckService,
    DriverService,
    MaterialService,
    PurchaseOrderService
  ]
})
export class BuyerModule { }
