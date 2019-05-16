import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';



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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserProvider, public storage: Storage, public BuilderService: PollBuilderServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  onLogout(){
    this.userService.logout(this.BuilderService.token)
    .subscribe(
      (response:any) =>{ 
      this.storage.clear()
      this.BuilderService.token = ""
      this.BuilderService.userId = ""
      this.BuilderService.pollSet.userId = ""
      this.BuilderService.meme.userId = ""
      console.log("logoooooout", this.BuilderService.token)
      //window.sessionStorage.clear();
      this.navCtrl.setRoot(DashboardPage);
      });

    }
  }


