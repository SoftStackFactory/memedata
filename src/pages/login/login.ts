import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookOathProvider } from '../../providers/facebook-oath/facebook-oath';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RegisterPage } from '../../pages/register/register';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

declare var FB: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userService: UserProvider, 
    public storage: Storage, 
    public BuilderService: PollBuilderServiceProvider,
    public platform: Platform,
    public fb: Facebook,
    public fbOath: FacebookOathProvider,
    ) {
  }

  ionViewDidLoad() {
    this.fbOath.facebookSDKLoad()
      console.log('ionViewDidLoad LoginPage');
  }

  forgot() {
    this.navCtrl.push(RegisterPage)
  }

  fbLogin(){
    if(this.platform.is("cordova")){
    // Login with permissions, Logging in if Cordova is available
    this.fb.login(['public_profile', 'user_photos', 'email'])
    .then( (res: FacebookLoginResponse) => {
        if(res.status == "connected") {
            // Get user ID and Token
            this.userService.data = res.authResponse
            this.fbOath.fbLoggedIn = true
            console.log(this.fbOath.fbLoggedIn)
            this.userService.mobileStorageSet()
            // Get user infos from the API
            this.fb.api("/me?fields=name,gender,email", []).then((user) => {
                // Get the connected user details
                var gender    = user.gender;
                var name      = user.name;
                var email     = user.email;
                console.log("=== USER INFOS ===");
                console.log("Gender : " + gender);
                console.log("Name : " + name);
                console.log("Email : " + email);
                this.navCtrl.setRoot(DashboardPage)
            });
        } 
        else {
            console.log("An error occurred...");
        }
    })
    .catch((e) => {
        console.log('Error logging into Facebook', e);
    });
    }else{
      //Login via browser platform if cordova is not available
      FB.login((response)=> {
            console.log('submitLogin',response);
            if (response.authResponse) {
              this.userService.data = response.authResponse
              this.fbOath.fbLoggedIn = true
              this.userService.coreStorageSet()
              console.log("Logged in with Facebook", response.authResponse)
              this.navCtrl.setRoot(DashboardPage)
            }else{
            console.log('User login failed');
            }
        },{scope: 'email'});
    }
  }

  onLogin(){
    this.userService.login(this.userService.user)
      .subscribe(
        (response: any) => {
          this.userService.data = response
          console.log("response", this.userService.data)
          if (this.platform.is("iphone" || "android" || "mobile" || "cordova")) {
            this.userService.mobileStorageSet()
          } else {
            this.userService.coreStorageSet()
          }
          this.userService.user = {
            email:'',
            password:''
          }
        
          this.navCtrl.setRoot(DashboardPage);
      })
  }

  noLogin() {
    this.navCtrl.setRoot(DashboardPage)
  }

}
