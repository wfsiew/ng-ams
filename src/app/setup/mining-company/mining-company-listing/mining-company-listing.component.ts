import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MiningCompanyService } from 'src/app/setup/mining-company/services/mining-company.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-mining-company-listing',
  templateUrl: './mining-company-listing.component.html',
  styleUrls: ['./mining-company-listing.component.css']
})
export class MiningCompanyListingComponent implements OnInit, OnDestroy {

  isLoading = false;
  list = [];
  totalCount = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  search = '';
  sort = 'name';
  sortDir = 'asc';
  sx = 0;
  sy = 0;
  bsModalRef: BsModalRef;
  subs: Subscription;

  readonly uiState = 'setup.mining-company.mining-company-listing';

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(
    private router: Router,
    private miningCompanyService: MiningCompanyService,
    private msService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
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

  ngOnInit() {
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
    this.miningCompanyService.list(this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir).subscribe((res: any) => {
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
    this.miningCompanyService.search(this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir, s).subscribe((res: any) => {
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
      this.sort = 'name';
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
    this.router.navigate([`/ams/setup/mining-company/${s}`]);
  }

  onUser(o) {
    let s = `user/${o.id}/list`;
    this.goto(s);
  }

  onMaterial(o) {
    let s = `material/${o.id}/list`;
    this.goto(s);
  }

  onEdit(o) {
    let s = `edit/${o.id}`;
    this.goto(s);
  }

  onDelete(o) {
    const initialState = {
      title: 'Delete Mining Company',
      message: `Are you sure to delete this Mining Company ${o.name} ?`
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, { class: 'modal-dialog-centered', initialState });
    this.bsModalRef.content.onClose.subscribe(res => {
      if (res.result === true) {
        this.miningCompanyService.remove(o.id).subscribe((res: any) => {
          this.toastr.success('Mining Company successfully deleted');
          this.load();
        });
      }
    });
  }

  getAddress(o) {
    let s = '';
    let ls = [o.addr_line_1];
    if (o.addr_line_2) {
      ls.push(o.addr_line_2);
    }

    if (o.addr_line_3) {
      ls.push(o.addr_line_3);
    }

    s = ls.join(', ');
    s = ` ${s} ${o.postcode} ${o.city}`;
    return s;
  }
}
