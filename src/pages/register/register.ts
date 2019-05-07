import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  data;
  user = {
    firstName: '',
    lastName: '',
    userName: '',
    email:'',
    password:'',
    dob:'',
    gender:'',
    zip:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserProvider) {
  }
  onClick(){
    this.userService.register(this.user)
      .subscribe(
        (response) => {
          this.data = response
          console.log(this.data)
          this.navCtrl.setRoot(RegisterPage);
        })
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // register() {
  //   this.navCtrl.setRoot(DashboardPage)
  // }

  toDash() {
    this.navCtrl.setRoot(DashboardPage)
  }


}
