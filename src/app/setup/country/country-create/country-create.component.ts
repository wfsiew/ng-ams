import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { CountryService } from 'src/app/setup/country/services/country.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrls: ['./country-create.component.css']
})
export class CountryCreateComponent extends GeneralForm implements OnInit {

  id: string;
  data: any = { id: '' };
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loc: Location,
    private countryService: CountryService,
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
      iso_code: ['', [Validators.required]]
    });
  }

  setForm() {
    const o = this.data;
    this.mform.patchValue({
      name: o.name,
      iso_code: o.iso_code
    });
  }

  load() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      return;
    }

    this.countryService.edit(this.id).subscribe((res: any) => {
      this.data = res;
      this.setForm();
    });
  }

  onBack() {
    this.loc.back();
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }
    
    const f = this.mform.value;
    const o = {
      id: '',
      name: f.name,
      iso_code: f.iso_code
    }
    if (!this.isEdit) {
      this.countryService.create(o).subscribe((res: any) => {
        this.toastr.success('New Country successfully created');
        this.router.navigate([`/ams/setup/country/edit/${res.id}`]);
      });
    }

    else {
      o.id = this.data.id;
      // this.countryService.update(o).subscribe((res: any) => {
      //   this.toastr.success('Country successfully updated');
      // });
    }
  }
}
