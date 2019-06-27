import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { SearchbarServiceProvider } from '../../providers/searchbar-service/searchbar-service';
import { FacebookOathProvider } from '../../providers/facebook-oath/facebook-oath';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { PollInterfacePage } from '../../pages/poll-interface/poll-interface';
import { LoginPage } from '../../pages/login/login';
import { LogoutPage } from '../../pages/logout/logout';
import { RegisterPage } from '../../pages/register/register';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { PollResultsPage } from '../../pages/poll-results/poll-results';
import { PollHistoryPage } from '../../pages/poll-history/poll-history';
import { AccountInfoPage } from '../../pages/account-info/account-info';

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
    public platform: Platform,
    public fb: Facebook,
    public fbOath: FacebookOathProvider,
    public alertCtrl: AlertController,
    public BuilderService: PollBuilderServiceProvider
    ) {
    console.log('Hello SearchbarComponent');
    this.text = 'Hello World';
  
  // used for an example of ngFor and navigation
  this.pages = [
    { title: 'Login', component: LoginPage },
    { title: 'Logout', component: LogoutPage },
    { title: 'Register', component: RegisterPage },
    { title: 'Dashboard', component: DashboardPage },
    { title: 'Results', component: PollResultsPage},
    { title: 'PollInterface', component: PollInterfacePage},
    { title: 'PollHistory', component: PollHistoryPage},
    { title: 'AccountInfo', component: AccountInfoPage}
  ];
  
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToLogin() {
    this.navCtrl.setRoot(this.pages[0].component);
  }
  
  goToAccountInfo() {
    this.navCtrl.setRoot(this.pages[7].component);
  }
  
  goToRewardsHistory() {
    this.navCtrl.setRoot(this.pages[6].component);
  }


  goToLogout() {
    const alert = this.alertCtrl.create({
      title: 'Logged Out!',
      message: 'You are now logged out of MemePoll!',
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
              if(this.platform.is("cordova")) {
                this.fb.logout()
                .then((res: FacebookLoginResponse) => {
                  this.userService.clearUserDetails()
                  console.log('Logged in to Facebook ==', !res)})
                .catch(e => console.log('Error logging into Facebook', e));
              } else {
              FB.api(
                "/me?logout",
                "POST",
                function(response) {
                console.log("logged in to Facebook ==", !response.success)
                });
              }
              this.userService.clearUserDetails()
              this.goToLogin()
            }else {
            this.userService.logout(this.BuilderService.token)
            .subscribe(
              (response:any) =>{ 
                console.log("user logged out with token ", this.BuilderService.token)
                this.userService.clearUserDetails()
                this.goToLogin()
              });
            }
            alert.present();
          }
        }
      ]
    });
    confirm.present();
  }

}
