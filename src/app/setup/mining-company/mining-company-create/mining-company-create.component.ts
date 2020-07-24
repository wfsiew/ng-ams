import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { LookupService } from 'src/app/shared/services/lookup.service';
import { MiningCompanyService } from 'src/app/setup/mining-company/services/mining-company.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-mining-company-create',
  templateUrl: './mining-company-create.component.html',
  styleUrls: ['./mining-company-create.component.css']
})
export class MiningCompanyCreateComponent extends GeneralForm implements OnInit {

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
    private miningCompanyService: MiningCompanyService,
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
      mining_license_num: ['', [Validators.required]],
      mining_license_expiry_date: [null, [Validators.required]],
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
      mining_license_num: o.mining_license_num,
      mining_license_expiry_date: o.mining_license_expiry_date,
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
      this.isLoading = false;
      return;
    }

    this.miningCompanyService.edit(this.id).subscribe((res: any) => {
      this.data = res;
      this.setForm();
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  onBack() {
    this.router.navigate(['/ams/setup/mining-company/list']);
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
      mining_license_num: f.mining_license_num,
      mining_license_expiry_date: Helper.toDateStr(f.mining_license_expiry_date),
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
      this.miningCompanyService.create(o).subscribe((res: any) => {
        this.toastr.success('New Mining Company successfully created');
        this.mform.reset();
        // this.router.navigate([`/ams/setup/state/edit/${res.id}`]);
      });
    }

    else {
      this.miningCompanyService.update(this.data.id, o).subscribe((res: any) => {
        this.toastr.success('Mining Company successfully updated');
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
