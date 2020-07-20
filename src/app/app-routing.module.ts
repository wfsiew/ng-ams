import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';

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
      }
    ]
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
