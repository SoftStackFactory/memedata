import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardTabsPage } from '../dashboard-tabs/dashboard-tabs';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  rootPage:any = DashboardTabsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goToHome() {
    this.navCtrl.setRoot(DashboardPage);
  }
  goToCreate() {
    this.navCtrl.setRoot(DashboardPage);
  }
  goToMyPolls() {
    this.navCtrl.setRoot(DashboardPage);
  }

}
