import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SetupRoutingModule } from './setup-routing.module';

import { SharedComponentModules } from '../shared/components/shared-components.module';
import { CountryListingComponent } from './country/country-listing/country-listing.component';
import { CountryCreateComponent } from './country/country-create/country-create.component';
import { StateListingComponent } from './state/state-listing/state-listing.component';
import { StateCreateComponent } from './state/state-create/state-create.component';

import { CountryService } from './country/services/country.service';

@NgModule({
  declarations: [
    CountryListingComponent, 
    CountryCreateComponent,
    StateListingComponent,
    StateCreateComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModules,
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    CountryService
  ]
})
export class SetupModule { }
