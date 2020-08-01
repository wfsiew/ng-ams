import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ClipboardModule } from 'ngx-clipboard';

import { MiningCompanyRoutingModule } from './mining-company-routing.module';

import { SharedComponentModules } from '../shared/components/shared-components.module';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DeliveryOrderListingComponent } from './delivery-order-listing/delivery-order-listing.component';
import { PermitDetailComponent } from './permit-detail/permit-detail.component';
import { PurchaseOrderListingComponent } from './purchase-order-listing/purchase-order-listing.component';
import { PurchaseOrderCreateComponent } from './purchase-order-create/purchase-order-create.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal.component';

import { CountryService } from 'src/app/setup/country/services/country.service';
import { StateService } from 'src/app/setup/state/services/state.service';
import { DeliveryOrderService } from 'src/app/mining-company/services/delivery-order.service';
import { PermitService } from 'src/app/mining-company/services/permit.service';
import { BuyerService } from 'src/app/setup/buyer/services/buyer.service';
import { TruckService } from 'src/app/setup/buyer/services/truck.service';
import { DriverService } from 'src/app/setup/buyer/services/driver.service';
import { MaterialService } from 'src/app/setup/material/services/material.service';
import { PurchaseOrderService } from './services/purchase-order.service';


@NgModule({
  declarations: [
    CompanyDetailsComponent,
    DeliveryOrderListingComponent,
    PermitDetailComponent,
    CheckoutModalComponent,
    PurchaseOrderListingComponent,
    PurchaseOrderCreateComponent,
    PurchaseOrderDetailComponent
  ],
  imports: [
    CommonModule,
    MiningCompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModules,
    NgSelectModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ClipboardModule
  ],
  entryComponents: [
    CheckoutModalComponent
  ],
  providers: [
    CountryService,
    StateService,
    DeliveryOrderService,
    PermitService,
    BuyerService,
    TruckService,
    DriverService,
    MaterialService,
    PurchaseOrderService
  ]
})
export class MiningCompanyModule { }
