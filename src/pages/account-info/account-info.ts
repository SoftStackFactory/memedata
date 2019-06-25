import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the AccountInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account-info',
  templateUrl: 'account-info.html',
})
export class AccountInfoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserProvider
    ) {
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountInfoPage');
  }

}
