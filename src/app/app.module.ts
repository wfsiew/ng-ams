import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, POSITION } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ErrorModalComponent } from './shared/components/error-modal/error-modal.component';

import { environment } from '../environments/environment';

import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HttpTimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

import { MessageService } from './shared/services/message.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth.guard.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      bgsPosition: POSITION.centerCenter,
      bgsColor: '#007bff',
      bgsType: 'rotating-plane',
      fgsColor: '#007bff',
      fgsType: 'rotating-plane'
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: false,
      exclude: [
      ]
    }),
  ],
  entryComponents: [
    ErrorModalComponent
  ],
  providers: [
    MessageService,
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
