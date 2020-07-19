import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListingComponent } from './country-listing/country-listing.component';
import { CountryCreateComponent } from './country-create/country-create.component';
import { StateListingComponent } from './state-listing/state-listing.component';
import { StateCreateComponent } from './state-create/state-create.component';



@NgModule({
  declarations: [CountryListingComponent, CountryCreateComponent, StateListingComponent, StateCreateComponent],
  imports: [
    CommonModule
  ]
})
export class SetupModule { }
