import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PurchaseOrderPrintComponent } from './purchase-order-print/purchase-order-print.component';
import { DeliveryOrderPrintComponent } from './delivery-order-print/delivery-order-print.component';
import { PermitPrintComponent } from './permit-print/permit-print.component';

import { AuthGuardService } from 'src/app/shared/services/auth.guard.service';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ams',
    component: IndexComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'setup',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule)
      },
      {
        path: 'buyer',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./buyer/buyer.module').then(m => m.BuyerModule)
      },
      {
        path: 'mining-company',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./mining-company/mining-company.module').then(m => m.MiningCompanyModule)
      },
      {
        path: 'report',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
      }
    ]
  },
  {
    path: 'purchase-order/:id/print',
    component: PurchaseOrderPrintComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'delivery-order/:id/print',
    component: DeliveryOrderPrintComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'permit/:id/print',
    component: PermitPrintComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '/ams/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
