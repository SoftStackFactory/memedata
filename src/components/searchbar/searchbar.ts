import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { SearchbarServiceProvider } from '../../providers/searchbar-service/searchbar-service';
import { FacebookOathProvider } from '../../providers/facebook-oath/facebook-oath';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';

import { PollInterfacePage } from '../../pages/poll-interface/poll-interface';
import { LoginPage } from '../../pages/login/login';
import { LogoutPage } from '../../pages/logout/logout';
import { RegisterPage } from '../../pages/register/register';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { PollResultsPage } from '../../pages/poll-results/poll-results';
import { PollHistoryPage } from '../../pages/poll-history/poll-history';

declare var FB: any;

/**
 * Generated class for the SearchbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'searchbar',
  templateUrl: 'searchbar.html'
})
export class SearchbarComponent {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  text: string;

  constructor(
    public search$: SearchbarServiceProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserProvider,
    public fbOath: FacebookOathProvider,
    public alertCtrl: AlertController,
    public BuilderService: PollBuilderServiceProvider
    ) {
    this.fbOath.facebookSDKLoad()
    console.log('Hello SearchbarComponent');
    this.text = 'Hello World';
  
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
  
  goToAccountInfo() {
    this.navCtrl.setRoot(DashboardPage);
  }
  
  goToRewardsHistory() {
    this.navCtrl.setRoot(PollHistoryPage);
  }

  toLogin() {
    this.navCtrl.setRoot(this.pages[0].component);
  }

  goToLogout() {
    const alert = this.alertCtrl.create({
      title: 'Logged Out!',
      subTitle: 'You are now logged out of MemePoll!',
      buttons: ['OK']
    });
    const confirm = this.alertCtrl.create({
      title: 'Logout?',
      message: 'Are you sure you want to Log out of MemePoll?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log("logged into facebook ==", this.fbOath.fbLoggedIn)
            if(this.fbOath.fbLoggedIn == true) {
              FB.api(
                "/me?logout",
                "POST",
                function(response) {
                console.log("logged in to Facebook ==", !response.success)
                this.toLogin()
              });
            }else {
            this.userService.logout(this.BuilderService.token)
            .subscribe(
              (response:any) =>{ 
                console.log("user logged out with token ", this.BuilderService.token)
                this.toLogin()
              });
            }
            this.userService.clearUserDetails()
            alert.present();
          }
        }
      ]
    });
    confirm.present();
    //this.userService.onLogout()
  }

}
