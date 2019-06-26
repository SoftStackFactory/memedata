import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FacebookOathProvider } from '../../providers/facebook-oath/facebook-oath';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RegisterPage } from '../../pages/register/register';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

declare var FB: any;

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
    public alertCtrl: AlertController,
    public fb: Facebook,
    public fbOath: FacebookOathProvider,
    ) {
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
  }

  forgot() {
    this.navCtrl.push(RegisterPage)
  }

  checkFbStatus() {
    if(this.platform.is("cordova")) {
      this.fb.getLoginStatus()
      .then( (res: FacebookLoginResponse) => {
        if(res.status === "connected") {
          // Get user ID and Token
          this.userService.data = res.authResponse
          this.fbOath.fbLoggedIn = true
          console.log("Facebook logged in ==", this.fbOath.fbLoggedIn, res.authResponse)
          this.userService.mobileStorageSet()
          // Get user infos from the API
          this.fb.api("/me?fields=name,gender,email,first_name,last_name,picture", []).then((user) => {
              // Get the connected user details
              console.log("=== USER INFOS ===",user)
              this.fbOath.userDetails = user
              this.navCtrl.setRoot(DashboardPage)
          });
      } 
      else {
        if (res.status === "unknown") {
          this.fbLogin()
        } else {
          console.log("An error occurred...");
        }
      }
  })
      .catch(e => 
        console.log("Error Logging into Facebook", e))
    } else {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.userService.data = response.authResponse
        this.fbOath.fbLoggedIn = true
        this.userService.coreStorageSet()
        this.fbOath.getFBUserDetails()
        console.log("Logged in with Facebook", response.authResponse)
        this.navCtrl.setRoot(DashboardPage)
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token 
        // and signed request each expire.
      } else if (response.status === 'not_authorized') {
        this.fbLogin()
      } else {
        if(response.status === "unknown") {
          this.fbLogin()
        }
        // The user isn't logged in to Facebook. You can launch a
        // login dialog with a user gesture, but the user may have
        // to log in to Facebook before authorizing your application.
      }
     });
    }
  }

  fbLogin(){
    if(this.platform.is("cordova")){
    // Login with permissions, Logging in if Cordova is available
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_friends'])
    .then( (res: FacebookLoginResponse) => {
        if(res.status == "connected") {
            // Get user ID and Token
            this.userService.data = res.authResponse
            this.fbOath.fbLoggedIn = true
            console.log("Facebook logged in ==", this.fbOath.fbLoggedIn, res.authResponse)
            this.userService.mobileStorageSet()
            // Get user infos from the API
            this.fb.api("/me?fields=name,gender,email,first_name,last_name,picture", []).then((user) => {
                // Get the connected user details
                console.log("=== USER INFOS ===",user);
                this.fbOath.userDetails = user
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
              this.fbOath.getFBUserDetails()
              console.log("Logged in with Facebook", response.authResponse)
              this.navCtrl.setRoot(DashboardPage)
            }
            else{
            console.log('User login failed');
            }
        },{scope: 'email, user_photos, user_birthday, user_friends'});
    }
  }

  onLogin(){
    this.userService.login(this.userService.userLogin)
      .subscribe(
        (response: any) => {
          this.userService.data = response
          console.log("Login response", this.userService.data)
          if (this.platform.is("cordova")) {
            this.userService.mobileStorageSet()
          } else {
            this.userService.coreStorageSet()
          }
          this.userService.userLogin = {
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
