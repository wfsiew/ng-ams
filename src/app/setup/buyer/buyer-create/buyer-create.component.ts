import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { LookupService } from 'src/app/shared/services/lookup.service';
import { BuyerService } from 'src/app/setup/buyer/services/buyer.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-buyer-create',
  templateUrl: './buyer-create.component.html',
  styleUrls: ['./buyer-create.component.css']
})
export class BuyerCreateComponent extends GeneralForm implements OnInit {

  isLoading = false;
  id: string;
  data: any = { id: '' };
  isEdit = false;
  countryList = [];
  stateList = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lookupService: LookupService,
    private buyerService: BuyerService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (!_.isNull(this.id)) {
        this.isEdit = true;
      }

      this.load();
    });
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
      this.mform.patchValue({ country_id: this.countryList[0].id });
      this.onChangeCountry(this.countryList[0]);
      this.loadDetails();
    }, (error) => {
      this.isLoading = false;
    });
  }

  loadDetails() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      this.isLoading = false;
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

  onBack() {
    this.router.navigate(['/ams/setup/buyer/list']);
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
    if (!this.isEdit) {
      this.buyerService.create(o).subscribe((res: any) => {
        this.toastr.success('New Buyer successfully created');
        this.mform.reset();
        // this.router.navigate([`/ams/setup/state/edit/${res.id}`]);
      });
    }

    else {
      this.buyerService.update(this.data.id, o).subscribe((res: any) => {
        this.toastr.success('Buyer successfully updated');
      });
    }
  }

  onChangeCountry(event) {
    this.lookupService.listStates(event.id).subscribe((res: any) => {
      this.stateList = res;
      this.mform.patchValue({ state_id: null });
    });
  }
}
