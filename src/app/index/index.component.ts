import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash';

import { MenuSetup, SubmenuSetup } from './menu-setup';
import { MenuBuyer, SubmenuBuyer } from './menu-buyer';
import { MenuOperator, SubmenuOperator } from './menu-operator';
import { MenuReport, SubmenuReport } from './menu-report';
import { MenuMiningHQ, SubmenuMiningHQ } from './menu-mining-hq';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  isLoading = false;
  menu: string;
  submenu: string;
  data: any = {};
  roles = '';
  role = '';
  subs: Subscription;

  readonly uiState = 'home.index';

  readonly submenuSetup = SubmenuSetup;
  readonly submenuBuyer = SubmenuBuyer;
  readonly submenuOperator = SubmenuOperator;
  readonly submenuMiningHQ = SubmenuMiningHQ;
  readonly submenuReport = SubmenuReport;
  readonly ROLE = AppConstant.ROLE;

  constructor(
    private router: Router,
    private authService: AuthService,
    private msService: MessageService,
    private toastr: ToastrService
  ) {
    this.subs = this.msService.get().subscribe(res => {
      if (res.name === this.uiState) {
        location.reload(true);
      }
    });
  }

  ngOnInit() {
    this.load();
    this.setMenu();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  load() {
    this.isLoading = true;
    this.authService.getUserDetails().subscribe((res: any) => {
      this.data = res;
      if (res.groups) {
        const groups: any[] = res.groups;
        const lr = groups.map((x) => x.name);
        this.roles = lr.join(', ');
        this.setRole(groups);
      }
      
      this.authService.saveUser(res);
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  setRole(groups: any[]) {
    if (this.hasRole(AppConstant.ROLE.ADMIN, groups)) {
      this.role = AppConstant.ROLE.ADMIN;
    }

    else if (this.hasRole(AppConstant.ROLE.BUYER, groups)) {
      this.role = AppConstant.ROLE.BUYER;
    }

    else if (this.hasRole(AppConstant.ROLE.OPERATOR, groups)) {
      this.role = AppConstant.ROLE.OPERATOR;
    }

    else if (this.hasRole(AppConstant.ROLE.MINING_HQ, groups)) {
      this.role = AppConstant.ROLE.MINING_HQ;
    }
  }

  hasRole(role: string, groups: any[]) {
    return _.some(groups, { 'name': role });
  }

  setMenu() {
    this.setTargetMenu('/ams/setup', 'setup', 'mining-company/list', MenuSetup.mining_list);
    this.setTargetMenu('/ams/setup', 'setup', 'buyer/list', MenuSetup.buyer_list);
    this.setTargetMenu('/ams/setup', 'setup', 'material/list', MenuSetup.material_list);
    this.setTargetMenu('/ams/setup', 'setup', 'user/list', MenuSetup.user_list);
    this.setTargetMenu('/ams/setup', 'setup', 'country/list', MenuSetup.country_list);
    this.setTargetMenu('/ams/setup', 'setup', 'state/list', MenuSetup.state_list);

    this.setTargetMenu('/ams/buyer', 'buyer', 'company-details', MenuBuyer.company_details);
    this.setTargetMenu('/ams/buyer', 'buyer', 'truck/list', MenuBuyer.truck_list);
    this.setTargetMenu('/ams/buyer', 'buyer', 'driver/list', MenuBuyer.driver_list);
    this.setTargetMenu('/ams/buyer', 'buyer', 'purchase-order/list', MenuBuyer.purchase_order_list);

    this.setTargetMenu('/ams/mining-company', 'mining-company', 'delivery-order/list', MenuOperator.delivery_order_list);
    this.setTargetMenu('/ams/mining-company', 'mining-company', 'company-details', MenuMiningHQ.company_details);
    this.setTargetMenu('/ams/mining-company', 'mining-company', 'delivery-order/list', MenuMiningHQ.delivery_order_list);
    this.setTargetMenu('/ams/mining-company', 'mining-company', 'purchase-order/list', MenuMiningHQ.purchase_order_list);
    this.setTargetMenu('/ams/mining-company', 'mining-company', 'buyer/list', MenuMiningHQ.buyer_list);
    //this.setTargetMenu('/ams/mining-company', 'mining-company', 'material/list', MenuMiningHQ.material_list);

    this.setTargetMenu('/ams/report', 'report', 'one', MenuReport.report_one);
    this.setTargetMenu('/ams/report', 'report', 'two', MenuReport.report_two);
    this.setTargetMenu('/ams/report', 'report', 'three', MenuReport.report_three);
    this.setTargetMenu('/ams/report', 'report', 'four', MenuReport.report_four);
    this.setTargetMenu('/ams/report', 'report', 'five', MenuReport.report_five);
    this.setTargetMenu('/ams/report', 'report', 'six', MenuReport.report_six);
    this.setTargetMenu('/ams/report', 'report', 'seven', MenuReport.report_seven);
    this.setTargetMenu('/ams/report', 'report', 'eight', MenuReport.report_eight);
  }

  setTargetMenu(url: string, targetMenu: string, targetSubmenu: string, matchList: string[]) {
    if (!_.isUndefined(this.submenu)) {
      return;
    }

    const x = this.router.url;
    if (x.indexOf(url) >= 0) {
      this.menu = targetMenu;
      const sm = x.replace(`${url}/`, '');

      if (_.some(matchList, (s) => {
        return sm.indexOf(s) >= 0;
      })) {
        this.submenu = targetSubmenu;
      }
    }
  }

  logout() {
    this.authService.logout().subscribe((res: any) => {
      this.router.navigate(['/login']);
    }, (error) => {
      this.toastr.error('Failed to logout', 'Logout Failed', {
        positionClass: 'toast-top-center'
      });
    });
    return false;
  }

  goto(s, link) {
    this.menu = s;
    this.submenu = link;
    this.router.navigate([`/ams/${s}/${link}`]);
    return false;
  }
}
