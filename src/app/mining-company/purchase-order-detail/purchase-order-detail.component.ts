import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { PurchaseOrderService } from 'src/app/mining-company/services/purchase-order.service';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent implements OnInit {

  isLoading = false;
  id: string;
  data: any = { id: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private purchaseOrderService: PurchaseOrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.load();
    });
  }

  load() {
    if (_.isNull(this.id) || _.isUndefined(this.id)) {
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.purchaseOrderService.detail(this.id).subscribe((res: any) => {
      this.data = res;
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  onBack() {
    this.router.navigate(['/ams/mining-company/purchase-order/list']);
  }

  onCopySuccess(event) {
    this.toastr.success('DO Details copied');
  }

  onWhatsapp() {
    let m = this.getPODetails();
    m = encodeURIComponent(m);
    let c = `${this.data.issue_to.contact_no}`;
    if (c && c.indexOf('60') < 0) {
      c = `6${c}`;
    }
    
    let s = `https://api.whatsapp.com/send?phone=${c}&text=${m}`;
    window.open(s, '_blank');
  }

  getPODetails() {
    const lx = this.data.details;
    let ls = [];
    let r = '';
    _.each(lx, (o) => {
      let s = `DO #${o.do_num}\n`;
      s += `Material: ${o.material.name}, Type: ${o.material.material_type}, Grade: ${o.material.grade}\n`;
      s += `Truck No: ${o.truck.registration_num}\n`;
      s += `Driver: ${o.driver.name}, IC No.: ${o.driver.id_num}\n\n`;
      ls.push(s);
    });

    r = ls.join('-----------------------------\n\n');

    return r;
  }
}
