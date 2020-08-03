import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';

import { PermitService } from 'src/app/mining-company/services/permit.service';

@Component({
  selector: 'app-permit-print',
  templateUrl: './permit-print.component.html',
  styleUrls: ['./permit-print.component.css']
})
export class PermitPrintComponent implements OnInit {

  isLoading = false;
  id: string;
  data: any = { id: '' };

  constructor(
    private route: ActivatedRoute,
    private permitService: PermitService
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
    this.permitService.detail(this.id).subscribe((res: any) => {
      this.data = res;
      setTimeout(() => {
        window.print();
      }, 300);
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  get issueToAddress1() {
    let s = '';
    if (this.data.purchase_order && this.data.purchase_order.issue_to) {
      const o = this.data.purchase_order.issue_to;
      let ls = [o.addr_line_1];
      if (o.addr_line_2) {
        ls.push(o.addr_line_2);
      }

      if (o.addr_line_3) {
        ls.push(o.addr_line_3);
      }

      s = ls.join(', ');
    }

    return s;
  }

  get issueToAddress2() {
    let s = '';
    if (this.data.purchase_order && this.data.purchase_order.issue_to) {
      const o = this.data.purchase_order.issue_to;
      s = ` ${o.postcode} ${o.city} ${o.state.name} ${o.country.name}`;
    }

    return s;
  }

  get destinationAddress() {
    let s = '';
    if (this.data.purchase_order_detail) {
      const o = this.data.purchase_order_detail;
      let ls = [o.recv_addr_line_1];
      if (o.recv_addr_line_2) {
        ls.push(o.recv_addr_line_2);
      }

      if (o.recv_addr_line_3) {
        ls.push(o.recv_addr_line_3);
      }

      s = ls.join(', ');
      s += ` ${o.recv_postcode} ${o.recv_city} ${o.recv_state.name} ${o.recv_country.name}`;
    }

    return s;
  }
}
