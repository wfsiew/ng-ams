import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListingComponent } from './country/country-listing/country-listing.component';
import { CountryCreateComponent } from './country/country-create/country-create.component';
import { StateListingComponent } from './state/state-listing/state-listing.component';
import { StateCreateComponent } from './state/state-create/state-create.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
