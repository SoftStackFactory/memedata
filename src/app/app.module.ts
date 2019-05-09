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

import { PollBuilderPage } from '../pages/poll-builder/poll-builder';
import { PollBuilder2Page } from '../pages/poll-builder2/poll-builder2';
import { PollBuilder3Page } from '../pages/poll-builder3/poll-builder3';
import { PollBuilder4Page } from '../pages/poll-builder4/poll-builder4';
import { PollInterfacePage } from '../pages/poll-interface/poll-interface';
import { PollResultsPage } from '../pages/poll-results/poll-results';
import { PollHistoryPage } from '../pages/poll-history/poll-history';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { PollBuilderServiceProvider } from '../providers/poll-builder-service/poll-builder-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    PollBuilderPage,
    PollBuilder2Page,
    PollBuilder3Page,
    PollBuilder4Page,
    PollInterfacePage,
    PollResultsPage,
    PollHistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    PollBuilderPage,
    PollBuilder2Page,
    PollBuilder3Page,
    PollBuilder4Page,
    PollInterfacePage,
    PollResultsPage,
    PollHistoryPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PollBuilderServiceProvider
  ]
})
export class AppModule {}
