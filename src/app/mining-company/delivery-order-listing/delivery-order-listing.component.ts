import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AuthService } from 'src/app/shared/services/auth.service';
import { DeliveryOrderService } from 'src/app/mining-company/services/delivery-order.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { Helper } from 'src/app/shared/utils/helper';
import { CheckoutModalComponent } from '../components/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-delivery-order-listing',
  templateUrl: './delivery-order-listing.component.html',
  styleUrls: ['./delivery-order-listing.component.css']
})
export class DeliveryOrderListingComponent implements OnInit {

  mining_company_id?: number;
  isLoading = false;
  list = [];
  totalCount = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  search = '';
  sort = 'do_num';
  sortDir = 'asc';
  sx = 0;
  sy = 0;
  bsModalRef: BsModalRef;
  subs: Subscription;

  readonly uiState = 'mining-company.delivery-order-listing';

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private deliveryOrderService: DeliveryOrderService,
    private msService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    const user = this.authService.loadUser();
    this.mining_company_id = user.mining_company_id;
    this.isLoading = true;

    this.subs = this.msService.get().subscribe(res => {
      if (res.name === this.uiState) {
        const o = res.data;
        this.page = o.page;
        this.sort = o.sort;
        this.sortDir = o.dir;
        this.search = o.search;
        this.sx = o.sx;
        this.sy = o.sy;
      }
    });

    this.load();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  load() {
    if (this.search !== '') {
      this.onSearch(this.search);
      return;
    }
    
    this.isLoading = true;
    this.deliveryOrderService.list(this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir).subscribe((res: any) => {
      this.list = res.body;
      const headers = res.headers;
      this.totalCount = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_COUNT));
      this.isLoading = false;
      setTimeout(() => {
        window.scrollTo(this.sx, this.sy);
      }, 200);
    }, (error) => {
      
    }, () => {
      this.isLoading = false;
    });
  }

  onSearch(s: string) {
    this.search = s;
    this.isLoading = true;
    this.deliveryOrderService.search(this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir, s).subscribe((res: any) => {
      this.list = res.body;
      const headers = res.headers;
      this.totalCount = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_COUNT));
      this.isLoading = false;
      setTimeout(() => {
        window.scrollTo(this.sx, this.sy);
      }, 200);
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  pageChanged(event: any) {
    this.page = event.page;
    this.load();
  }

  onSortBy(e) {
    if (e.sort === '' && e.dir === 'asc') {
      this.sort = 'do_num';
      this.sortDir = 'asc';
    }

    else {
      this.sort = e.sort;
      this.sortDir = e.dir;
    }

    this.load();
  }

  goto(s) {
    this.msService.send(this.uiState, {
      page: this.page,
      sort: this.sort,
      dir: this.sortDir,
      search: this.search,
      sx: window.scrollX,
      sy: window.scrollY
    });
    this.router.navigate([`/ams/mining-company/delivery-order/${s}`]);
  }

  onCheckIn(o) {
    this.isLoading = true;
    this.deliveryOrderService.updateTime({ id: o.id, checkin: 1 }).subscribe((res: any) => {
      this.toastr.success(`DO #${o.do_num} successfully checked in`);
      this.load();
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  onCheckOut(o) {
    const initialState = {
      title: 'Check Out DO',
      actual_weight: o.actual_weight
    };
    this.bsModalRef = this.modalService.show(CheckoutModalComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe(res => {
      if (res.result === true) {
        this.isLoading = true;
        this.deliveryOrderService.updateTime({ id: o.id, checkin: 0, actual_weight: res.actual_weight }).subscribe((res: any) => {
          this.toastr.success(`DO #${o.do_num} successfully checked out`);
          this.load();
        }, (error) => {

        }, () => {
          this.isLoading = false;
        });
      }
    });
  }
}
