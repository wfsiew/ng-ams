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
  mining_company_id?: number;
  buyerList = [];
  materialList = [];
  truckList = [];
  driverList = [];
  countryList = [];

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
    this.mining_company_id = user.mining_company_id;
    this.load();
  }

  createForm() {
    this.mform = this.fb.group({
      buyer_id: [null, [Validators.required]],
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
    let q1 = this.lookupService.listBuyer();
    let q2 = this.lookupService.listMiningCompany();
    let q3 = this.lookupService.listMaterial();
    let q4 = this.lookupService.listCountry();
    forkJoin([q1, q2, q3, q4]).subscribe((res: any[]) => {
      this.buyerList = res[0];
      this.materialList = res[1];
      this.countryList = res[2];

      this.materialList = res[1].map((k) => {
        k.label = `${k.name} (${k.material_type}) - ${k.grade}`;
        return k;
      });
    }, (error) => {

    }, () => {
      this.isLoading = false;
    })
  }

  onBack() {
    this.router.navigate(['/ams/mining-company/purchase-order/list']);
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
      buyer_id: f.buyer_id,
      issue_to_id: this.mining_company_id,
      purchase_order_detail: lp
    }

    this.purchaseOrderService.create(o).subscribe((res: any) => {
      this.toastr.success('New Purchase Order successfully created');
      this.mform.reset();
    });
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

      const fx = this.materialForms;
      _.each(fx.controls, (fg: FormGroup) => {
        fg.patchValue({
          truck_id: null,
          driver_id: null
        });
      });
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
