import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { Platform } from 'ionic-angular'


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userService: UserProvider, 
    public storage: Storage, 
    public BuilderService: PollBuilderServiceProvider,
    public platform: Platform
    ) {
  }
  
  onRegister(){
    this.userService.register(this.userService.userRegister)
      .subscribe(
        (response: any) => {
          console.log("Register response", response)
          this.userService.data = response
          if (this.platform.is("cordova")) { //checking platform, setting storage with ionic
            this.userService.mobileStorageSet()
          } else {
            this.userService.coreStorageSet()
            }
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
