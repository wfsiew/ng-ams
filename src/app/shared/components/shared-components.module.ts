import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { SearchInputComponent } from './search-input/search-input.component';
import { SortColumnComponent } from './sort-column/sort-column.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

const components = [
  SearchInputComponent,
  SortColumnComponent,
  ConfirmModalComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: components,
  entryComponents: [
    ConfirmModalComponent
  ],
  providers: []
})
export class SharedComponentModules {}
