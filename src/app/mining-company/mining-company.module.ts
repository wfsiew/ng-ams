import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { MiningCompanyRoutingModule } from './mining-company-routing.module';

import { SharedComponentModules } from '../shared/components/shared-components.module';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DeliveryOrderListingComponent } from './delivery-order-listing/delivery-order-listing.component';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal.component';

import { CountryService } from 'src/app/setup/country/services/country.service';
import { StateService } from 'src/app/setup/state/services/state.service';
import { DeliveryOrderService } from 'src/app/mining-company/services/delivery-order.service';


@NgModule({
  declarations: [
    CompanyDetailsComponent,
    DeliveryOrderListingComponent,
    CheckoutModalComponent
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
    PaginationModule.forRoot()
  ],
  entryComponents: [
    CheckoutModalComponent
  ],
  providers: [
    CountryService,
    StateService,
    DeliveryOrderService
  ]
})
export class MiningCompanyModule { }
