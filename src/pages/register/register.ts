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
    username: '',
    email:'',
    password:'',
    dob:'',
    gender:'',
    zip:''
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserProvider) {
  }
  
  onRegister(){
    this.userService.register(this.user)
      .then(
        response => {
          window.sessionStorage.setItem('token', response.data.token);
          window.sessionStorage.setItem('userId', response.data.userId);
          console.log(response.status)
          console.log(response.data) // data received by server
          console.log(response.headers)
          if(response.data == 200) {}
          this.data = response
          console.log(this.data)
          this.navCtrl.setRoot(DashboardPage);
        })
        .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
      
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  toDash() {
    this.navCtrl.setRoot(DashboardPage)
  }


}
