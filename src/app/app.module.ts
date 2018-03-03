import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AliasComponent } from './components/alias/alias.component';
import { InterestsComponent } from './components/interests/interests.component';

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
    path: 'alias', component: AliasComponent
  },
  {
    path: 'interests', component: InterestsComponent
  },
  {
    path: '', redirectTo: '/games', pathMatch: 'full'
  }
];

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

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
    UserTooltipComponent,
    AliasComponent,
    InterestsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    SocketIoModule.forRoot(config),
    FormsModule 
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
