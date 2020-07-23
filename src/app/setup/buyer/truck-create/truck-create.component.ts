import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { TruckService } from 'src/app/setup/buyer/services/truck.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-truck-create',
  templateUrl: './truck-create.component.html',
  styleUrls: ['./truck-create.component.css']
})
export class TruckCreateComponent extends GeneralForm implements OnInit {

  isLoading = false;
  buyer_id: string;
  id: string;
  data: any = { id: '' };
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private truckService: TruckService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.buyer_id = params.get('buyer_id');
      if (!_.isNull(this.id)) {
        this.isEdit = true;
      }

      this.load();
    });
  }

  createForm() {
    this.mform = this.fb.group({
      registration_num: ['', [Validators.required]]
    });
  }

  setForm() {
    const o = this.data;
    this.mform.patchValue({
      registration_num: o.registration_num
    });
  }

  load() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      return;
    }

    this.isLoading = true;
    this.truckService.edit(this.buyer_id, this.id).subscribe((res: any) => {
      this.data = res;
      this.setForm();
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  onBack() {
    this.router.navigate([`/ams/setup/buyer/truck/${this.buyer_id}/list`]);
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }
    
    const f = this.mform.value;
    const o = {
      registration_num: f.registration_num,
      buyer_id: this.buyer_id
    }
    if (!this.isEdit) {
      this.truckService.create(this.buyer_id, o).subscribe((res: any) => {
        this.toastr.success('New Truck successfully created');
        this.mform.reset();
        // this.router.navigate([`/ams/setup/country/edit/${res.id}`]);
      });
    }

    else {
      this.truckService.update(this.buyer_id, this.data.id, o).subscribe((res: any) => {
        this.toastr.success('Truck successfully updated');
      });
    }
  }
}
