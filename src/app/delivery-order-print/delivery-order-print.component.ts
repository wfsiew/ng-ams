import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';

import { AuthService } from 'src/app/shared/services/auth.service';
import { DeliveryOrderService } from 'src/app/mining-company/services/delivery-order.service';

@Component({
  selector: 'app-delivery-order-print',
  templateUrl: './delivery-order-print.component.html',
  styleUrls: ['./delivery-order-print.component.css']
})
export class DeliveryOrderPrintComponent implements OnInit {

  isLoading = false;
  id: string;
  data: any = { id: '' };

  constructor(
    private route: ActivatedRoute,
    private deliveryOrderService: DeliveryOrderService
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
    this.deliveryOrderService.edit(this.id).subscribe((res: any) => {
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
