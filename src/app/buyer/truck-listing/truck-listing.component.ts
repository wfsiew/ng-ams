import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TruckService } from 'src/app/setup/buyer/services/truck.service';
import { BuyerService } from 'src/app/setup/buyer/services/buyer.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-truck-listing',
  templateUrl: './truck-listing.component.html',
  styleUrls: ['./truck-listing.component.css']
})
export class TruckListingComponent implements OnInit, OnDestroy {

  buyer_id?: number;
  buyer = '';
  isLoading = false;
  list = [];
  totalCount = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  search = '';
  sort = 'registration_num';
  sortDir = 'asc';
  sx = 0;
  sy = 0;
  bsModalRef: BsModalRef;
  subs: Subscription;

  readonly uiState = 'buyer.truck-listing';

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private truckService: TruckService,
    private buyerService: BuyerService,
    private msService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    const user = this.authService.loadUser();
    this.buyer_id = user.buyer_id;
    this.isLoading = true;
    this.loadBuyer();

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

  loadBuyer() {
    this.buyerService.edit(this.buyer_id).subscribe((res: any) => {
      this.buyer = ` - ${res.name}`;
      this.load();
    });
  }

  load() {
    if (this.search !== '') {
      this.onSearch(this.search);
      return;
    }
    
    this.isLoading = true;
    this.truckService.list(this.buyer_id, this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir).subscribe((res: any) => {
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
    this.truckService.search(this.buyer_id, this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir, s).subscribe((res: any) => {
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
      this.sort = 'registration_num';
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
    this.router.navigate([`/ams/buyer/truck/${s}`]);
  }

  onEdit(o) {
    let s = `edit/${o.id}`;
    this.goto(s);
  }

  onDelete(o) {
    const initialState = {
      title: 'Delete Truck',
      message: `Are you sure to delete this Truck ${o.registration_num} ?`
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, { class: 'modal-dialog-centered', initialState });
    this.bsModalRef.content.onClose.subscribe(res => {
      if (res.result === true) {
        this.truckService.remove(this.buyer_id, o.id).subscribe((res: any) => {
          this.toastr.success('Truck successfully deleted');
          this.load();
        });
      }
    });
  }
}
