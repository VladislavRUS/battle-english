import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingLoginComponent } from './components/landing-login/landing-login.component';
import { LoginService } from './services/login.service';
import { GamesComponent } from './components/games/games.component';
import { HeaderComponent } from './components/header/header.component';

const appRoutes: Routes = [
  {
    path: 'games', component: GamesComponent
  },
  {
    path: '', redirectTo: '/games', pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    HeaderComponent,
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
