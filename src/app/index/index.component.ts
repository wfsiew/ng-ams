import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, noop } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash';

import { MenuSetup, SubmenuSetup } from './menu-setup';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  menu: string;
  submenu: string;
  data: any = {};
  roles = '';
  subs: Subscription;

  readonly uiState = 'home.index';

  readonly submenuSetup = SubmenuSetup;

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
    this.authService.getUserDetails().subscribe((res: any) => {
      this.data = res;
      if (res.groups) {
        this.roles = res.groups.join(',');
      }
      
      this.authService.saveUser(res);
    })
  }

  setMenu() {
    this.setTargetMenu('/ams/setup', 'setup', 'buyer/list', MenuSetup.buyer_list);
    this.setTargetMenu('/ams/setup', 'setup', 'country/list', MenuSetup.country_list);
    this.setTargetMenu('/ams/setup', 'setup', 'state/list', MenuSetup.state_list);
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
