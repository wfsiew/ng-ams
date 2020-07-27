import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PurchaseOrderPrintComponent } from './purchase-order-print/purchase-order-print.component';
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
      }
    ]
  },
  {
    path: 'purchase-order/:id/print',
    component: PurchaseOrderPrintComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'permit/:id/print',
    component: PermitPrintComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '/ams' }
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
