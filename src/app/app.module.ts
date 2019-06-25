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
import { LogoutPage } from '../pages/logout/logout';
import { PollBuilderPage } from '../pages/poll-builder/poll-builder';
import { PollBuilder2Page } from '../pages/poll-builder2/poll-builder2';
import { PollBuilder3Page } from '../pages/poll-builder3/poll-builder3';
import { PollBuilder4Page } from '../pages/poll-builder4/poll-builder4';
import { PollInterfacePage } from '../pages/poll-interface/poll-interface';
import { PollResultsPage } from '../pages/poll-results/poll-results';
import { PollHistoryPage } from '../pages/poll-history/poll-history';
import { AccountInfoPage } from '../pages/account-info/account-info';

import { SearchbarComponent } from '../components/searchbar/searchbar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//ionic
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

//providers
import { UserProvider } from '../providers/user/user';
import { PollBuilderServiceProvider } from '../providers/poll-builder-service/poll-builder-service';
import { DashboardServiceProvider } from '../providers/dashboard-service/dashboard-service';
import { ResultsServiceProvider } from '../providers/results-service/results-service';
import { SearchbarServiceProvider } from '../providers/searchbar-service/searchbar-service';
import { PollInterfaceProvider } from '../providers/poll-interface-provider/poll-interface-provider';
import { SpinnerServiceProvider } from '../providers/spinner-service/spinner-service';
import { FacebookOathProvider } from '../providers/facebook-oath/facebook-oath';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    LogoutPage,
    RegisterPage,
    DashboardPage,
    PollBuilderPage,
    PollBuilder2Page,
    PollBuilder3Page,
    PollBuilder4Page,
    PollInterfacePage,
    PollResultsPage,
    PollHistoryPage,
    AccountInfoPage,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    LogoutPage,
    RegisterPage,
    DashboardPage,
    PollBuilderPage,
    PollBuilder2Page,
    PollBuilder3Page,
    PollBuilder4Page,
    PollInterfacePage,
    PollResultsPage,
    PollHistoryPage,
    AccountInfoPage,
    SearchbarComponent
  ],
  providers: [
    Facebook,
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DashboardServiceProvider,
    UserProvider,
    PollBuilderServiceProvider,
    ResultsServiceProvider,
    SearchbarServiceProvider,
    PollInterfaceProvider,
    SpinnerServiceProvider,
    FacebookOathProvider,
  ]
})
export class AppModule {}
