import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { DeliveryOrderService } from 'src/app/mining-company/services/delivery-order.service';

@Component({
  selector: 'app-delivery-order-detail',
  templateUrl: './delivery-order-detail.component.html',
  styleUrls: ['./delivery-order-detail.component.css']
})
export class DeliveryOrderDetailComponent implements OnInit {

  isLoading = false;
  id: string;
  data: any = { id: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private deliveryOrderService: DeliveryOrderService,
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
    this.deliveryOrderService.edit(this.id).subscribe((res: any) => {
      this.data = res;
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  onBack() {
    this.router.navigate(['/ams/mining-company/delivery-order/list']);
  }
}
