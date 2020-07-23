import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { LookupService } from 'src/app/shared/services/lookup.service';
import { PurchaseOrderService } from 'src/app/buyer/services/purchase-order.service';
import { Helper } from 'src/app/shared/utils/helper';
import { GeneralForm } from 'src/app/shared/classes/general.form';

@Component({
  selector: 'app-purchase-order-create',
  templateUrl: './purchase-order-create.component.html',
  styleUrls: ['./purchase-order-create.component.css']
})
export class PurchaseOrderCreateComponent extends GeneralForm implements OnInit {

  isLoading = false;
  miningCompanyList = [];
  materialList = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lookupService: LookupService,
    private purchaseOrderService: PurchaseOrderService,
    private toastr: ToastrService
  ) {
    super();
    this.createForm();
  }

  ngOnInit() {
    this.load();
  }

  createForm() {
    this.mform = this.fb.group({
      mining_company_id: [null],

      materialForms: this.fb.array([])
    });
  }

  createMaterialForm(): FormGroup {
    return this.fb.group({
      id: [_.uniqueId()],
      material_id: [null],
      weight: ['0'],
      destination: ['']
    });
  }

  load() {
    this.isLoading = true;
    let q1 = this.lookupService.listMiningCompany();
    let q2 = this.lookupService.listMaterial();
    forkJoin([q1, q2]).subscribe((res: any[]) => {
      this.miningCompanyList = res[0];
      this.materialList = res[1];
    }, (error) => {

    }, () => {
      this.isLoading = false;
    })
  }

  onAddMaterial() {
    let materialForms = this.materialForms;
    materialForms.push(this.createMaterialForm());
  }

  onRemoveMaterial(o: FormGroup) {
    let materialForms = this.materialForms;
    let lx = _.reject(materialForms.controls, (x: FormGroup) => {
      return x.controls.id.value === o.controls.id.value;
    });
    materialForms.controls = lx;
  }

  onSubmit() {

  }

  get materialForms() {
    return this.mform.get('materialForms') as FormArray;
  }
}
