import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import _ from 'lodash';

import { PermitService } from 'src/app/mining-company/services/permit.service';

@Component({
  selector: 'app-permit-detail',
  templateUrl: './permit-detail.component.html',
  styleUrls: ['./permit-detail.component.css']
})
export class PermitDetailComponent implements OnInit {

  isLoading = false;
  id: string;
  data: any = { id: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  onBack() {
    this.router.navigate(['/ams/mining-company/delivery-order/list']);
  }

  get issueFromAddress1() {
    let s = '';
    if (this.data.do_master && this.data.do_master.issue_from) {
      const o = this.data.do_master.issue_from;
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

  get issueFromAddress2() {
    let s = '';
    if (this.data.do_master && this.data.do_master.issue_from) {
      const o = this.data.do_master.issue_from;
      s = ` ${o.postcode} ${o.city} ${o.state.name} ${o.country.name}`;
    }

    return s;
  }

  get destinationAddress() {
    let s = '';
    if (this.data.do_master) {
      const o = this.data.do_master;
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
