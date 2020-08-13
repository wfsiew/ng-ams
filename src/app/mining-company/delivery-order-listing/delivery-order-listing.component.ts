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
export class DeliveryOrderListingComponent implements OnInit, OnDestroy {

  mining_company_id?: number;
  isLoading = false;
  list = [];
  totalCount = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  search = '';
  do_status = ['all'];
  isRoleMiningHQ = false;
  sort = 'created_date';
  sortDir = 'desc';
  sx = 0;
  sy = 0;
  bsModalRef: BsModalRef;
  subs: Subscription;
  doStatusList = [
    { id: 'all', name: 'ALL' },
    { id: '0', name: 'NEW' },
    { id: '1', name: 'IN PROGRESS' },
    { id: '2', name: 'DISPATCHING' },
    { id: '3', name: 'RECEIVED' }
  ];

  readonly uiState = 'mining-company.delivery-order-listing';

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;
  readonly DOStatus = AppConstant.DOStatus;

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
    this.isRoleMiningHQ = this.authService.hasRole(AppConstant.ROLE.MINING_HQ);
    this.isLoading = true;

    this.subs = this.msService.get().subscribe(res => {
      if (res.name === this.uiState) {
        const o = res.data;
        this.page = o.page;
        this.sort = o.sort;
        this.sortDir = o.dir;
        this.search = o.search;
        this.do_status = o.do_status;
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
    this.deliveryOrderService.list(this.do_status, this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir).subscribe((res: any) => {
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
    this.page = 1;
    this.isLoading = true;
    this.deliveryOrderService.search(this.do_status, this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir, s).subscribe((res: any) => {
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
      this.sort = 'created_date';
      this.sortDir = 'desc';
    }

    else {
      this.sort = e.sort;
      this.sortDir = e.dir;
    }

    this.load();
  }

  onApplyFilter() {
    this.load();
  }

  goto(s) {
    this.msService.send(this.uiState, {
      page: this.page,
      sort: this.sort,
      dir: this.sortDir,
      search: this.search,
      do_status: this.do_status,
      sx: window.scrollX,
      sy: window.scrollY
    });
    this.router.navigate([`/ams/mining-company/delivery-order/${s}`]);
  }

  onEdit(o) {
    let s = `edit/${o.id}`;
    this.goto(s);
  }

  onView(o) {
    let s = `detail/${o.id}`;
    this.goto(s);
  }

  onCheckIn(o) {
    const initialState = {
      title: 'Vehicle Entry',
      weight: o.checkin_weight,
      btnYesText: 'Submit'
    };
    this.bsModalRef = this.modalService.show(CheckoutModalComponent, { class: 'modal-dialog-centered', initialState });
    this.bsModalRef.content.onClose.subscribe(res => {
      if (res.result === true) {
        this.isLoading = true;
        this.deliveryOrderService.updateTime({ id: o.id, checkin: 1, weight: res.weight }).subscribe((res: any) => {
          this.toastr.success(`DO #${o.do_num} successfully updated`);
          this.load();
        }, (error) => {

        }, () => {
          this.isLoading = false;
        });
      }
    });
  }

  onCheckOut(o) {
    const initialState = {
      title: 'Vehicle Exit',
      weight: o.checkout_weight,
      btnYesText: 'Submit'
    };
    this.bsModalRef = this.modalService.show(CheckoutModalComponent, { class: 'modal-dialog-centered', initialState });
    this.bsModalRef.content.onClose.subscribe(res => {
      if (res.result === true) {
        this.isLoading = true;
        this.deliveryOrderService.updateTime({ id: o.id, checkin: 0, weight: res.weight }).subscribe((res: any) => {
          this.toastr.success(`DO #${o.do_num} successfully updated`);
          this.load();
        }, (error) => {

        }, () => {
          this.isLoading = false;
        });
      }
    });
  }

  onPermit(o) {
    this.msService.send(this.uiState, {
      page: this.page,
      sort: this.sort,
      dir: this.sortDir,
      search: this.search,
      do_status: this.do_status,
      sx: window.scrollX,
      sy: window.scrollY
    });
    this.router.navigate([`/ams/mining-company/permit/${o.permit.id}`]);
  }

  // onReceived(o) {
  //   this.isLoading = true;
  //   this.deliveryOrderService.receive(o.id).subscribe((res: any) => {
  //     this.toastr.success(`DO #${o.do_num} successfully received`);
  //     this.load();
  //   }, (error) => {

  //   }, () => {
  //     this.isLoading = false;
  //   });
  // }

  getDOStatus(o) {
    if (o.status === AppConstant.DOStatus.NEW) return 'NEW';
    else if (o.status === AppConstant.DOStatus.IN_PROGRESS) return 'IN PROGRESS';
    else if (o.status === AppConstant.DOStatus.DELIVERING) return 'DISPATCHING';
    else if (o.status === AppConstant.DOStatus.DELIVERED) return 'RECEIVED';

    return 'NEW';
  }
}
