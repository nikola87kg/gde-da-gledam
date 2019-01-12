import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppMaterialModule } from './app.material.module';
import { FrontPageComponent } from './front-page/front-page.component';
import { FullListComponent } from './full-list/full-list.component';
import { AdminGuard } from './admin/admin.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './_services/auth.intereceptor';
import { ChatComponent } from './chat/chat.component';
import { SnackbarComponent } from './_services/snackbar/snackbar.component';
import { AuthComponent } from './auth/auth.component';

/* Social Login */
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';

// const fbLoginOptions: LoginOpt = {
//   scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
//   return_scopes: true,
//   enable_profile_selector: true
// };

let config = new AuthServiceConfig([
  {
    id: '41643208031-pm80vpelmiafks1ui00jhgp029vogjkt.apps.googleusercontent.com',
    provider: new GoogleLoginProvider('41643208031-pm80vpelmiafks1ui00jhgp029vogjkt.apps.googleusercontent.com')
  },
  // {
  //   id: '346737786057293',
  //   provider: new FacebookLoginProvider('346737786057293', fbLoginOptions)
  // }
]);

// google-secret: '3pvO-zOGlyDGrUjRNymBYf_V',

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FrontPageComponent,
    FullListComponent,
    ChatComponent,
    SnackbarComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: AuthServiceConfig, useFactory: provideConfig }
  ],
  entryComponents: [
    SnackbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
