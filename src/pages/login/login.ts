import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RegisterPage } from '../../pages/register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  data;
  user = {
    email:'',
    password:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgot() {
    this.navCtrl.setRoot(RegisterPage)
  }

  onClick(){
    this.userService.login(this.user)
      .subscribe(
        (response) => {
          this.data = response
          console.log(this.data)
          this.navCtrl.setRoot(DashboardPage);
        })
  }

  noLogin() {
    this.navCtrl.setRoot(DashboardPage)
  }

}
