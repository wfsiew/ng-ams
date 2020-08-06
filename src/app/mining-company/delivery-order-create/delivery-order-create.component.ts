import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { DeliveryOrderService } from 'src/app/mining-company/services/delivery-order.service';
import { Helper } from 'src/app/shared/utils/helper';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-delivery-order-create',
  templateUrl: './delivery-order-create.component.html',
  styleUrls: ['./delivery-order-create.component.css']
})
export class DeliveryOrderCreateComponent extends GeneralForm implements OnInit {

  isLoading = false;
  id: string;
  data: any = { id: '' };
  isEdit = false;
  mining_company_id?: number;
  buyerList = [];
  materialList = [];
  truckList = [];
  driverList = [];
  countryList = [];
  stateList = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private lookupService: LookupService,
    private deliveryOrderService: DeliveryOrderService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    const user = this.authService.loadUser();
    this.mining_company_id = user.mining_company_id;

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
      buyer_id: [null, [Validators.required]],
      material_id: [null, [Validators.required]],
      truck_id: [null, [Validators.required]],
      driver_id: [null, [Validators.required]],
      recv_name: ['', [Validators.required]],
      recv_addr_line_1: ['', [Validators.required]],
      recv_addr_line_2: [''],
      recv_addr_line_3: [''],
      recv_postcode: ['', [Validators.required]],
      recv_city: ['', [Validators.required]],
      recv_state_id: [null, [Validators.required]],
      recv_country_id: [null, [Validators.required]]
    });
  }

  setForm() {
    const o = this.data;
    this.mform.patchValue({
      // name: o.name,
      // registration_num: o.registration_num,
      // contact_no: o.contact_no,
      // email: o.email,
      // fax_no: o.fax_no,
      // addr_line_1: o.addr_line_1,
      // addr_line_2: o.addr_line_2,
      // addr_line_3: o.addr_line_3,
      // postcode: o.postcode,
      // city: o.city,
      // country_id: o.country.id
    });

    // this.lookupService.listStates(o.country.id).subscribe((res: any) => {
    //   this.stateList = res;
    //   this.mform.patchValue({ state_id: o.state.id });
    // });
  }

  load() {
    this.isLoading = true;
    let q1 = this.lookupService.listBuyer();
    let q2 = this.lookupService.listMaterial(this.mining_company_id);
    let q3 = this.lookupService.listCountry();
    forkJoin([q1, q2, q3]).subscribe((res: any[]) => {
      this.buyerList = res[0];
      this.materialList = res[1];
      this.countryList = res[2];

      this.materialList = res[1].map((k) => {
        k.label = `${k.name} (${k.material_type}) - ${k.grade}`;
        return k;
      });

      this.mform.patchValue({ recv_country_id: this.countryList[0].id });
      this.onChangeReceiverCountry(this.countryList[0]);
      this.loadDetails();
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  loadDetails() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      this.isLoading = false;
      return;
    }

    // this.buyerService.edit(this.id).subscribe((res: any) => {
    //   this.data = res;
    //   this.setForm();
    // }, (error) => {

    // }, () => {
    //   this.isLoading = false;
    // });
  }

  onBack() {
    this.router.navigate(['/ams/mining-company/delivery-order/list']);
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }

    const f = this.mform.value;
    const o = {
      buyer_id: f.buyer_id,
      issue_from_id: this.mining_company_id,
      material_id: f.material_id,
      truck_id: f.truck_id,
      driver_id: f.driver_id,
      recv_name: f.recv_name,
      recv_addr_line_1: f.recv_addr_line_1,
      recv_addr_line_2: f.recv_addr_line_2,
      recv_addr_line_3: f.recv_addr_line_3,
      recv_postcode: f.recv_postcode,
      recv_city: f.recv_city,
      recv_state_id: f.recv_state_id,
      recv_country_id: f.recv_country_id
    }
    if (!this.isEdit) {
      this.deliveryOrderService.create(o).subscribe((res: any) => {
        this.toastr.success('New Delivery Order successfully created');
        this.mform.reset();
        // this.router.navigate([`/ams/setup/state/edit/${res.id}`]);
      });
    }

    else {
      // this.deliveryOrderService.update(this.data.id, o).subscribe((res: any) => {
      //   this.toastr.success('Buyer successfully updated');
      // });
    }
  }

  onChangeBuyer(event) {
    let q1 = this.lookupService.listTruck(event.id);
    let q2 = this.lookupService.listDriver(event.id);
    forkJoin([q1, q2]).subscribe((res: any[]) => {
      this.truckList = res[0];
      this.driverList = res[1];

      this.driverList = res[1].map((k) => {
        k.label = `${k.name} - ${k.id_num}`;
        return k;
      });

      this.mform.patchValue({
        truck_id: null,
        driver_id: null
      });
    });
  }

  onChangeReceiverCountry(event) {
    this.lookupService.listStates(event.id).subscribe((res: any) => {
      this.stateList = res;
      this.mform.patchValue({ state_id: null });
    });
  }
}
