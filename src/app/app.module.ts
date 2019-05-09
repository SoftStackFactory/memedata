import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DashboardTabsPage } from '../pages/dashboard-tabs/dashboard-tabs';

import { PollBuilderPage } from '../pages/poll-builder/poll-builder';
import { PollInterfacePage } from '../pages/poll-interface/poll-interface';
import { PollResultsPage } from '../pages/poll-results/poll-results';
import { PollHistoryPage } from '../pages/poll-history/poll-history';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DashboardServiceProvider } from '../providers/dashboard-service/dashboard-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    DashboardTabsPage,
    PollBuilderPage,
    PollInterfacePage,
    PollResultsPage,
    PollHistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    DashboardTabsPage,
    PollBuilderPage,
    PollInterfacePage,
    PollResultsPage,
    PollHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DashboardServiceProvider
  ]
})
export class AppModule {}
