import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingLoginComponent } from './components/landing-login/landing-login.component';
import { LoginService } from './services/login.service';

const appRoutes: Routes = [
  {
    path: 'login', component: LandingLoginComponent
  }, {
    path: '',redirectTo: '/login',pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LandingLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
