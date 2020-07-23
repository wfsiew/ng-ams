import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { LookupService } from 'src/app/shared/services/lookup.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BuyerService } from 'src/app/setup/buyer/services/buyer.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent extends GeneralForm implements OnInit {

  isLoading = false;
  id?: number;
  data: any = { id: '' };
  countryList = [];
  stateList = [];

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private authService: AuthService,
    private buyerService: BuyerService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    const user = this.authService.loadUser();
    this.id = user.buyer_id;
    this.load();
  }

  createForm() {
    this.mform = this.fb.group({
      name: ['', [Validators.required]],
      registration_num: ['', [Validators.required]],
      contact_no: ['', [Validators.required]],
      email: [''],
      fax_no: [''],
      addr_line_1: ['', [Validators.required]],
      addr_line_2: [''],
      addr_line_3: [''],
      postcode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state_id: [null, [Validators.required]],
      country_id: [null, [Validators.required]]
    });
  }

  setForm() {
    const o = this.data;
    this.mform.patchValue({
      name: o.name,
      registration_num: o.registration_num,
      contact_no: o.contact_no,
      email: o.email,
      fax_no: o.fax_no,
      addr_line_1: o.addr_line_1,
      addr_line_2: o.addr_line_2,
      addr_line_3: o.addr_line_3,
      postcode: o.postcode,
      city: o.city,
      country_id: o.country.id
    });

    this.lookupService.listStates(o.country.id).subscribe((res: any) => {
      this.stateList = res;
      this.mform.patchValue({ state_id: o.state.id });
    });
  }

  load() {
    this.isLoading = true;
    this.lookupService.listCountry().subscribe((res: any) => {
      this.countryList = res;
      this.loadDetails();
    }, (error) => {
      this.isLoading = false;
    });
  }

  loadDetails() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      return;
    }

    this.buyerService.edit(this.id).subscribe((res: any) => {
      this.data = res;
      this.setForm();
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }
    
    const f = this.mform.value;
    const o = {
      name: f.name,
      registration_num: f.registration_num,
      contact_no: f.contact_no,
      email: f.email,
      fax_no: f.fax_no,
      addr_line_1: f.addr_line_1,
      addr_line_2: f.addr_line_2,
      addr_line_3: f.addr_line_3,
      postcode: f.postcode,
      city: f.city,
      state_id: f.state_id,
      country_id: f.country_id
    }
    this.buyerService.update(this.data.id, o).subscribe((res: any) => {
      this.toastr.success('Company Details successfully updated');
    });
  }

  onChangeCountry(event) {
    this.lookupService.listStates(event.id).subscribe((res: any) => {
      this.stateList = res;
      this.mform.patchValue({ state_id: null });
    });
  }
}
