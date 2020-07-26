import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';

import { AuthService } from 'src/app/shared/services/auth.service';
import { PurchaseOrderService } from 'src/app/buyer/services/purchase-order.service';

@Component({
  selector: 'app-purchase-order-print',
  templateUrl: './purchase-order-print.component.html',
  styleUrls: ['./purchase-order-print.component.css']
})
export class PurchaseOrderPrintComponent implements OnInit {

  isLoading = false;
  id: string;
  data: any = { id: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private purchaseOrderService: PurchaseOrderService
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
      setTimeout(() => {
        window.print();
      }, 300);
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }
}
