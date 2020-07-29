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
  // stateList = [];

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
      materialForms: this.fb.array([])
    });
  }

  createMaterialForm(): FormGroup {
    return this.fb.group({
      id: [_.uniqueId()],
      material_id: [null],
      weight: ['0', [Validators.required, Validators.pattern(AppConstant.VALIDATE.AMOUNT)]],
      truck_id: [null, [Validators.required]],
      driver_id: [null, [Validators.required]],
      recv_name: ['', [Validators.required]],
      recv_addr_line_1: ['', [Validators.required]],
      recv_addr_line_2: [''],
      recv_addr_line_3: [''],
      recv_postcode: ['', [Validators.required]],
      recv_city: ['', [Validators.required]],
      recv_state_id: [null, [Validators.required]],
      recv_country_id: [null, [Validators.required]],
      stateList: [[]]
    });
  }

  load() {
    this.isLoading = true;
    let q1 = this.lookupService.listMiningCompany();
    let q2 = this.lookupService.listMaterial();
    let q3 = this.lookupService.listTruck(this.buyer_id);
    let q4 = this.lookupService.listDriver(this.buyer_id);
    let q5 = this.lookupService.listCountry();
    forkJoin([q1, q2, q3, q4, q5]).subscribe((res: any[]) => {
      this.miningCompanyList = res[0];
      this.materialList = res[1];
      this.truckList = res[2];
      this.countryList = res[4];

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

  onAddMaterial() {
    let materialForms = this.materialForms;
    const fg = this.createMaterialForm();
    fg.patchValue({ recv_country_id: this.countryList[0].id });
    this.onChangeReceiverCountry(this.countryList[0], fg);
    materialForms.insert(0, fg);
  }

  onRemoveMaterial(o: FormGroup) {
    let materialForms = this.materialForms;
    let lx = _.reject(materialForms.controls, (x: FormGroup) => {
      return x.controls.id.value === o.controls.id.value;
    });
    materialForms.controls = lx;
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }

    const fx = this.materialForms;
    const lp = fx.value.map((x) => {
      return {
        material_id: x.material_id,
        truck_id: x.truck_id,
        driver_id: x.driver_id,
        weight: x.weight,
        recv_name: x.recv_name,
        recv_addr_line_1: x.recv_addr_line_1,
        recv_addr_line_2: x.recv_addr_line_2,
        recv_addr_line_3: x.recv_addr_line_3,
        recv_postcode: x.recv_postcode,
        recv_city: x.recv_city,
        recv_state_id: x.recv_state_id,
        recv_country_id: x.recv_country_id
      }
    });

    const f = this.mform.value;
    const o = {
      buyer_id: this.buyer_id,
      issue_to_id: f.mining_company_id,
      purchase_order_detail: lp
    }

    this.purchaseOrderService.create(o).subscribe((res: any) => {
      this.toastr.success('New Purchase Order successfully created');
      this.mform.reset();
    });
  }

  onChangeReceiverCountry(event, o: FormGroup) {
    this.lookupService.listStates(event.id).subscribe((res: any) => {
      o.patchValue({ state_id: null, stateList: res });
    });
  }

  get materialForms() {
    return this.mform.get('materialForms') as FormArray;
  }

  getStateList(o: FormGroup) {
    return o.controls.stateList.value;
  }

  invalidFg(fg: FormGroup, s: string) {
    const m = fg.controls[s];
    return m.invalid && (m.dirty || m.touched);
  }

  hasErrorFg(fg: FormGroup, s: string, e: string) {
    return fg.controls[s].hasError(e);
  }
}
