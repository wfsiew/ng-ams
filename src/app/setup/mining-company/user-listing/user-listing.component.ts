import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { UserService } from 'src/app/setup/mining-company/services/user.service';
import { MiningCompanyService } from 'src/app/setup/mining-company/services/mining-company.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { Helper } from 'src/app/shared/utils/helper';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit, OnDestroy {

  mining_company_id: string;
  mining_company = '';
  isLoading = false;
  list = [];
  totalCount = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  search = '';
  sort = 'username';
  sortDir = 'asc';
  tab = 0;
  sx = 0;
  sy = 0;
  bsModalRef: BsModalRef;
  subs: Subscription;

  readonly uiState = 'setup.mining-company.user-listing';

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private miningCompanyService: MiningCompanyService,
    private msService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mining_company_id = params.get('mining_company_id');
      this.loadMiningCompany();
    });

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

  loadMiningCompany() {
    this.miningCompanyService.edit(this.mining_company_id).subscribe((res: any) => {
      this.mining_company = ` - ${res.name}`;
      this.load();
    });
  }

  load() {
    if (this.search !== '') {
      this.onSearch(this.search);
      return;
    }
    
    this.isLoading = true;
    let q = null;
    if (this.tab === 0) {
      q = this.userService.listPending(this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir);
    }

    else {
      q = this.userService.listActive(this.mining_company_id, this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir)
    }

    q.subscribe((res: any) => {
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
    let q = null;
    if (this.tab === 0) {
      q = this.userService.searchPending(this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir, s);
    }

    else {
      q = this.userService.searchActive(this.mining_company_id, this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir, s);
    }

    q.subscribe((res: any) => {
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
      this.sort = 'username';
      this.sortDir = 'asc';
    }

    else {
      this.sort = e.sort;
      this.sortDir = e.dir;
    }

    this.load();
  }

  onTab(i) {
    if (this.tab !== i) {
      this.page = 1;
    }
    
    this.tab = i;
    this.load();
    return false;
  }

  onAssign(o) {
    this.userService.assign({ mining_company_id: this.mining_company_id, user_id: o.id }).subscribe((res: any) => {
      this.toastr.success('User successfully assigned');
      this.load();
    })
  }

  onDelete(o) {
    const initialState = {
      title: `Delete User from ${this._mining_company}`,
      message: `Are you sure to delete this User ${o.username} from ${this._mining_company} ?`
    };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe(res => {
      if (res.result === true) {
        this.userService.remove({ mining_company_id: this.mining_company_id, user_id: o.id }).subscribe((res: any) => {
          this.toastr.success('User successfully deleted');
          this.load();
        });
      }
    });
  }

  getUserRoles(o): string {
    const ls: any[] = o.groups;
    const lr = ls.map((x) => x.name);
    const s = lr.join(', ');
    return s;
  }

  private get _mining_company() {
    let s = this.buyer.replace(' - ', '');
    return s;
  }
}
