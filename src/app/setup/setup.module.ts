import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SetupRoutingModule } from './setup-routing.module';

import { SharedComponentModules } from '../shared/components/shared-components.module';
import { CountryListingComponent } from './country/country-listing/country-listing.component';
import { CountryCreateComponent } from './country/country-create/country-create.component';
import { StateListingComponent } from './state/state-listing/state-listing.component';
import { StateCreateComponent } from './state/state-create/state-create.component';
import { BuyerListingComponent } from './buyer/buyer-listing/buyer-listing.component';
import { BuyerCreateComponent } from './buyer/buyer-create/buyer-create.component';
import { TruckListingComponent } from './buyer/truck-listing/truck-listing.component';
import { TruckCreateComponent } from './buyer/truck-create/truck-create.component';
import { MiningCompanyCreateComponent } from './mining-company/mining-company-create/mining-company-create.component';
import { MiningCompanyListingComponent } from './mining-company/mining-company-listing/mining-company-listing.component';

import { CountryService } from './country/services/country.service';
import { StateService } from './state/services/state.service';
import { BuyerService } from './buyer/services/buyer.service';
import { TruckService } from './buyer/services/truck.service';
import { MiningCompanyService } from './mining-company/services/mining-company.service';

@NgModule({
  declarations: [
    CountryListingComponent, 
    CountryCreateComponent,
    StateListingComponent,
    StateCreateComponent,
    BuyerListingComponent,
    BuyerCreateComponent,
    TruckListingComponent,
    TruckCreateComponent,
    MiningCompanyListingComponent,
    MiningCompanyCreateComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
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
    MiningCompanyService
  ]
})
export class SetupModule { }
