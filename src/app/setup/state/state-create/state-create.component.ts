import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { LookupService } from 'src/app/shared/services/lookup.service';
import { StateService } from 'src/app/setup/state/services/state.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-state-create',
  templateUrl: './state-create.component.html',
  styleUrls: ['./state-create.component.css']
})
export class StateCreateComponent extends GeneralForm implements OnInit {

  id: string;
  data: any = { id: '' };
  isEdit = false;
  countryList = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lookupService: LookupService,
    private stateService: StateService,
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
      country_id: [null, [Validators.required]]
    });
  }

  setForm() {
    const o = this.data;
    this.mform.patchValue({
      name: o.name,
      country_id: o.country.id
    });
  }

  load() {
    this.lookupService.listCountry().subscribe((res: any) => {
      this.countryList = res;
      this.loadDetails();
    });
  }

  loadDetails() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      return;
    }

    this.stateService.edit(this.id).subscribe((res: any) => {
      this.data = res;
      this.setForm();
    });
  }

  onBack() {
    this.router.navigate(['/ams/setup/state/list']);
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }
    
    const f = this.mform.value;
    const o = {
      name: f.name,
      country_id: f.country_id
    }
    if (!this.isEdit) {
      this.stateService.create(o).subscribe((res: any) => {
        this.toastr.success('New State successfully created');
        this.mform.reset();
        // this.router.navigate([`/ams/setup/state/edit/${res.id}`]);
      });
    }

    else {
      this.stateService.update(this.data.id, o).subscribe((res: any) => {
        this.toastr.success('State successfully updated');
      });
    }
  }
}
