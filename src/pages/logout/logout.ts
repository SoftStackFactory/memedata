import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';


/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  data;
  user = {
    email:'',
    password:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  // onLogout(){
  //   this.userService.login(this.user)
  //     .subscribe(
  //       (response:any) => {
  //         window.sessionStorage.clear();
  //         window.sessionStorage.clear();
  //         this.navCtrl.setRoot(DashboardPage);
  //       })
  // }

}
