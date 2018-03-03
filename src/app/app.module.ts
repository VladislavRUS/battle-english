import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingLoginComponent } from './components/landing-login/landing-login.component';
import { LoginService } from './services/login.service';
import { GamesComponent } from './components/games/games.component';
import { HeaderComponent } from './components/header/header.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { BlockheadComponent } from './components/blockhead/blockhead.component';
import { OpponentsComponent } from './components/opponents/opponents.component';
import { DynamicContentComponent } from './components/dynamic-content/dynamic-content.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipService } from './services/tooltip.service';
import { UserTooltipComponent } from './components/user-tooltip/user-tooltip.component';

const appRoutes: Routes = [
  {
    path: 'games', component: GamesComponent
  },
  {
    path: 'statistics', component: StatisticsComponent
  },
  {
    path: 'opponents', component: OpponentsComponent
  },
  {
    path: 'blockhead', component: BlockheadComponent
  },
  {
    path: '', redirectTo: '/games', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BlockheadComponent,
    GamesComponent,
    HeaderComponent,
    LandingLoginComponent,
    StatisticsComponent,
    OpponentsComponent,
    DynamicContentComponent,
    TooltipComponent,
    UserTooltipComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LoginService,
    TooltipService
  ],
  entryComponents: [
    UserTooltipComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
