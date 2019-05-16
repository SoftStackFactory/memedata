import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  data: any;
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserProvider, public storage: Storage, public BuilderService: PollBuilderServiceProvider) {
  }
  
  onRegister(){
    this.userService.register(this.user)
      .subscribe(
        (response: any) => {
          //window.sessionStorage.setItem('token', response.token); //setting storage for browser platform
          //window.sessionStorage.setItem('userId', response.userId);
          console.log(response)
          this.data = response
          this.storage.set("token", this.data.token) //setting storage for android/ios platform
          this.storage.set("userId", this.data.userId)
          console.log("your token is", this.data.token)
          console.log("your userId is", this.data.userId)
          this.storage.get('token').then((val) => { //getting from ionic storage for android/ios platform
            console.log('got your token is', val);
          this.BuilderService.token = val})
          this.storage.get('userId').then((val) => {
            console.log('got your userId is', val);
          this.BuilderService.userId = val
          this.BuilderService.pollSet.userId = val
          this.BuilderService.meme.userId = val})

          this.navCtrl.setRoot(DashboardPage);
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  toDash() {
    this.navCtrl.setRoot(DashboardPage)
  }


}
