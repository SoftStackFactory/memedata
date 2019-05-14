import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';



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

  onLogout(){
    this.userService.logout(window.sessionStorage.token)
    .then(
      (response:any) =>{ 
      console.log("logoooooout")
      });
      window.sessionStorage.clear();
      this.navCtrl.setRoot(DashboardPage);
        }
  }


