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
}
