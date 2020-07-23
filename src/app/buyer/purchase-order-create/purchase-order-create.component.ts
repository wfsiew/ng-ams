import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { LookupService } from 'src/app/shared/services/lookup.service';
import { PurchaseOrderService } from 'src/app/buyer/services/purchase-order.service';
import { Helper } from 'src/app/shared/utils/helper';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-purchase-order-create',
  templateUrl: './purchase-order-create.component.html',
  styleUrls: ['./purchase-order-create.component.css']
})
export class PurchaseOrderCreateComponent extends GeneralForm implements OnInit {

  isLoading = false;
  buyer_id?: number;
  miningCompanyList = [];
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
    private purchaseOrderService: PurchaseOrderService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    const user = this.authService.loadUser();
    this.buyer_id = user.buyer_id;
    this.load();
  }

  createForm() {
    this.mform = this.fb.group({
      mining_company_id: [null, [Validators.required]],
      truck_id: [null, [Validators.required]],
      driver_id: [null, [Validators.required]],
      material_id: [null, [Validators.required]],
      weight: ['0', [Validators.required, Validators.pattern(AppConstant.VALIDATE.AMOUNT)]],
      receiver_name: ['', [Validators.required]],
      receiver_addr_line_1: ['', [Validators.required]],
      receiver_addr_line_2: [''],
      receiver_addr_line_3: [''],
      receiver_postcode: ['', [Validators.required]],
      receiver_city: ['', [Validators.required]],
      receiver_state_id: [null, [Validators.required]],
      receiver_country_id: [null, [Validators.required]]
    });
  }

  load() {
    this.isLoading = true;
    let q1 = this.lookupService.listMiningCompany();
    let q2 = this.lookupService.listMaterial();
    let q3 = this.lookupService.listTruck(this.buyer_id);
    var q4 = this.lookupService.listDriver(this.buyer_id);
    forkJoin([q1, q2, q3, q4]).subscribe((res: any[]) => {
      this.miningCompanyList = res[0];
      this.materialList = res[1];
      this.truckList = res[2];

      this.driverList = res[3].map((k) => {
        k.label = `${k.name} - ${k.id_num}`;
        return k;
      });
    }, (error) => {

    }, () => {
      this.isLoading = false;
    })
  }

  onBack() {
    this.router.navigate(['/ams/buyer/purchase-order/list']);
  }

  onSubmit() {

  }

  onChangeReceiverCountry(event) {
    this.lookupService.listStates(event.id).subscribe((res: any) => {
      this.stateList = res;
      this.mform.patchValue({ state_id: null });
    });
  }
}
