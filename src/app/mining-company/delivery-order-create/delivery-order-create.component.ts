import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AuthService } from 'src/app/shared/services/auth.service';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { TruckService } from 'src/app/setup/buyer/services/truck.service';
import { DriverService } from 'src/app/setup/buyer/services/driver.service';
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
  truckImg = null;
  truckReg = '';
  driverImg = null;
  driverId = '';
  buyerList = [];
  materialList = [];
  truckList = [];
  driverList = [];
  countryList = [];
  stateList = [];
  bsModalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private lookupService: LookupService,
    private deliveryOrderService: DeliveryOrderService,
    private truckService: TruckService,
    private driverService: DriverService,
    private toastr: ToastrService,
    private modalService: BsModalService
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
      po_num: ['', [Validators.required]],
      contract_num: [''],
      remarks: [''],
      buyer_id: [null, [Validators.required]],
      weight: ['0', [Validators.required, Validators.pattern(AppConstant.VALIDATE.AMOUNT)]],
      material_id: [null, [Validators.required]],
      truck_id: [null, [Validators.required]],
      driver_id: [null],

      pickup_name: ['', [Validators.required]],
      pickup_addr_line_1: ['', [Validators.required]],
      pickup_addr_line_2: [''],
      pickup_addr_line_3: [''],
      pickup_postcode: ['', [Validators.required]],
      pickup_city: ['', [Validators.required]],
      pickup_state_id: [null, [Validators.required]],
      pickup_country_id: [null, [Validators.required]],

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
      po_num: o.po_num,
      contract_num: o.contract_num,
      remarks: o.remarks,
      buyer_id: o.buyer.id,
      weight: o.weight,
      material_id: o.material.id,
      truck_id: o.truck.id,
      driver_id: o.driver.id,

      pickup_name: o.pickup_name,
      pickup_addr_line_1: o.pickup_addr_line_1,
      pickup_addr_line_2: o.pickup_addr_line_2,
      pickup_addr_line_3: o.pickup_addr_line_3,
      pickup_postcode: o.pickup_postcode,
      pickup_city: o.pickup_city,
      pickup_country_id: o.pickup_country.id,

      recv_name: o.recv_name,
      recv_addr_line_1: o.recv_addr_line_1,
      recv_addr_line_2: o.recv_addr_line_2,
      recv_addr_line_3: o.recv_addr_line_3,
      recv_postcode: o.recv_postcode,
      recv_city: o.recv_city,
      recv_country_id: o.recv_country.id
    });

    let q1 = this.lookupService.listTruck(o.buyer.id);
    let q2 = this.lookupService.listDriver(o.buyer.id);
    let q3 = this.lookupService.listStates(o.recv_country.id);
    forkJoin([q1, q2, q3]).subscribe((res: any[]) => {
      this.truckList = res[0];
      this.driverList = res[1];
      this.stateList = res[2];

      this.driverList = res[1].map((k) => {
        k.label = `${k.name} - ${k.id_num}`;
        return k;
      });

      this.mform.patchValue({
        truck_id: o.truck.id,
        driver_id: o.driver.id,
        pickup_state_id: o.pickup_state.id,
        recv_state_id: o.recv_state.id
      });
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
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
        k.label = `${k.name.toUpperCase()} / ${k.material_type.toUpperCase()} / ${k.grade.toUpperCase()}`;
        return k;
      });

      this.mform.patchValue({
        pickup_country_id: this.countryList[0].id,
        recv_country_id: this.countryList[0].id
      });
      this.onChangePickupCountry(this.countryList[0]);
      this.onChangeReceiverCountry(this.countryList[0]);
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

    this.deliveryOrderService.edit(this.id).subscribe((res: any) => {
      this.data = res;
      this.setForm();
    }, (error) => {
      this.isLoading = false;
    });
  }

  onViewTruck(truckIm) {
    const f = this.mform.value;
    this.truckService.edit(f.buyer_id, f.truck_id).subscribe((res: any) => {
      if (res.img) {
        this.truckReg = res.registration_num;
        this.truckImg = res.img.img;
        this.bsModalRef = this.modalService.show(truckIm, { class: 'modal-lg' });
      }

      else {
        this.toastr.info('No image found for this truck');
      }
    });

    return false;
  }

  onViewDriver(driverIm) {
    const f = this.mform.value;
    this.driverService.edit(f.buyer_id, f.driver_id).subscribe((res: any) => {
      if (res.license) {
        this.driverId = res.id_num;
        this.driverImg = res.license.img;
        this.bsModalRef = this.modalService.show(driverIm, { class: 'modal-lg' });
      }

      else {
        this.toastr.info('No image found for this driver');
      }
    });

    return false;
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
      po_num: f.po_num,
      contract_num: f.contract_num,
      remarks: f.remarks,
      buyer_id: f.buyer_id,
      weight: f.weight,
      issue_from_id: this.mining_company_id,
      material_id: f.material_id,
      truck_id: f.truck_id,
      driver_id: f.driver_id,

      pickup_name: f.pickup_name,
      pickup_addr_line_1: f.pickup_addr_line_1,
      pickup_addr_line_2: f.pickup_addr_line_2,
      pickup_addr_line_3: f.pickup_addr_line_3,
      pickup_postcode: f.pickup_postcode,
      pickup_city: f.pickup_city,
      pickup_state_id: f.pickup_state_id,
      pickup_country_id: f.pickup_country_id,

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
      this.deliveryOrderService.update(this.data.id, o).subscribe((res: any) => {
        this.toastr.success('Delivery Order successfully updated');
      });
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

  onChangePickupCountry(event) {
    this.lookupService.listStates(event.id).subscribe((res: any) => {
      this.stateList = res;
      this.mform.patchValue({ pickup_state_id: null });
    });
  }

  onChangeReceiverCountry(event) {
    this.lookupService.listStates(event.id).subscribe((res: any) => {
      this.stateList = res;
      this.mform.patchValue({ recv_state_id: null });
    });
  }
}
