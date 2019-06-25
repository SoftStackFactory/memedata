import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';

import { PollInterfacePage } from '../pages/poll-interface/poll-interface';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { RegisterPage } from '../pages/register/register';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { PollResultsPage } from '../pages/poll-results/poll-results';

import { SearchbarServiceProvider } from '../providers/searchbar-service/searchbar-service';
import { SpinnerServiceProvider } from '../providers/spinner-service/spinner-service';
import { FacebookOathProvider } from '../providers/facebook-oath/facebook-oath';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  spinner:any 

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen, 
              public search$: SearchbarServiceProvider,
              public events: Events,
              public spinnerService: SpinnerServiceProvider,
              public fbOath: FacebookOathProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'Logout', component: LogoutPage },
      { title: 'Register', component: RegisterPage },
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Results', component: PollResultsPage},
      { title: 'PollInterface', component: PollInterfacePage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log("your platform(s) is/are", this.platform.platforms())
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  goToAccountInfo() {
    this.nav.setRoot(DashboardPage);
  }
  
  goToRewardsHistory() {
    this.nav.setRoot(DashboardPage);
  }
  goToLogout() {
    this.nav.setRoot(DashboardPage);
  }

}
