import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, POSITION } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PurchaseOrderPrintComponent } from './purchase-order-print/purchase-order-print.component';
import { PermitPrintComponent } from './permit-print/permit-print.component';
import { ErrorModalComponent } from './shared/components/error-modal/error-modal.component';

import { environment } from '../environments/environment';

import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HttpTimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

import { MessageService } from './shared/services/message.service';
import { LookupService } from './shared/services/lookup.service';
import { PurchaseOrderService } from './buyer/services/purchase-order.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { DeliveryOrderPrintComponent } from './delivery-order-print/delivery-order-print.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    ErrorModalComponent,
    PurchaseOrderPrintComponent,
    PermitPrintComponent,
    DeliveryOrderPrintComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      bgsPosition: POSITION.centerCenter,
      // bgsColor: '#dc143c',
      bgsType: 'ball-scale-multiple',
      // fgsColor: '#dc143c',
      fgsType: 'ball-scale-multiple'
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: false,
      exclude: [
        `${environment.baseUrl}/o/token/`,
        `${environment.baseUrl}/o/revoke_token/`,
        `${environment.baseUrl}/api/current-user`
      ]
    }),
  ],
  entryComponents: [
    ErrorModalComponent
  ],
  providers: [
    MessageService,
    LookupService,
    PurchaseOrderService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTimeoutInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
