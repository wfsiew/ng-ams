import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PurchaseOrderService } from 'src/app/buyer/services/purchase-order.service';
import { BuyerService } from 'src/app/setup/buyer/services/buyer.service';
import { MiningCompanyService } from 'src/app/setup/mining-company/services/mining-company.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-purchase-order-listing',
  templateUrl: './purchase-order-listing.component.html',
  styleUrls: ['./purchase-order-listing.component.css']
})
export class PurchaseOrderListingComponent implements OnInit, OnDestroy {

  buyer_id?: number;
  isLoading = false;
  list = [];
  totalCount = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  search = '';
  sort = 'po_num';
  sortDir = 'asc';
  sx = 0;
  sy = 0;
  bsModalRef: BsModalRef;
  subs: Subscription;

  readonly uiState = 'buyer.purchase-order-listing';

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private purchaseOrderService: PurchaseOrderService,
    private msService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    const user = this.authService.loadUser();
    this.buyer_id = user.buyer_id;
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
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  load() {
    if (this.search !== '') {
      this.onSearch(this.search);
      return;
    }
    
    // this.isLoading = true;
    // this.truckService.list(this.buyer_id, this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir).subscribe((res: any) => {
    //   this.list = res.body;
    //   const headers = res.headers;
    //   this.totalCount = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_COUNT));
    //   this.isLoading = false;
    //   setTimeout(() => {
    //     window.scrollTo(this.sx, this.sy);
    //   }, 200);
    // }, (error) => {
      
    // }, () => {
    //   this.isLoading = false;
    // });
  }

  onSearch(s: string) {
    this.search = s;
    // this.isLoading = true;
    // this.truckService.search(this.buyer_id, this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir, s).subscribe((res: any) => {
    //   this.list = res.body;
    //   const headers = res.headers;
    //   this.totalCount = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_COUNT));
    //   this.isLoading = false;
    //   setTimeout(() => {
    //     window.scrollTo(this.sx, this.sy);
    //   }, 200);
    // }, (error) => {

    // }, () => {
    //   this.isLoading = false;
    // });
  }

  pageChanged(event: any) {
    this.page = event.page;
    this.load();
  }

  onSortBy(e) {
    if (e.sort === '' && e.dir === 'asc') {
      this.sort = 'po_num';
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
    this.router.navigate([`/ams/buyer/purchase-order/${s}`]);
  }
}
