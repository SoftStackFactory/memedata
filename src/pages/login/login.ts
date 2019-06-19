import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RegisterPage } from '../../pages/register/register';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  data: any;
  user = {
    email:'',
    password:''
  }
  FB: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userService: UserProvider, 
    public storage: Storage, 
    public BuilderService: PollBuilderServiceProvider,
    public platform: Platform,
    public fb: Facebook
    ) {
  }

  ionViewDidLoad() {
    console.log(this.fb)
    window.fbAsyncInit = function() {//Facebook sdk for browser users
      FB.init({
        appId      : '2459782430910597',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.3'
      });
        
      FB.AppEvents.logPageView();   
        
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
    console.log('ionViewDidLoad LoginPage');
  }

  mobileStorageSet(){
    this.storage.set("token", this.data.accessToken);
    this.storage.set("userId", this.data.userId);
    console.log("your token is", this.data.accessToken)
    console.log("your userId is", this.data.userId)
    this.storage.get('token').then((val) => { //getting from ionic storage for android/iphone/mobile platform
      console.log('got your token', val);
    this.BuilderService.token = val})
    this.storage.get('userId').then((val) => {
      console.log('got your userId', val);
    this.userService.loggedIn = true
    this.BuilderService.userId = val
    this.BuilderService.pollSet.userId = val
    this.BuilderService.meme.userId = val})
  }

  coreStorageSet(){// setting session storage for all other devices such as desktop, windows, mobileweb, browsers, non Cordova
    if (this.data.accessToken) {
      window.sessionStorage.setItem('access token', this.data.accessToken)//setting storage for Facebook login response
    }else{
      window.sessionStorage.setItem('token', this.data.token);//setting storage for login to backend DB
    }
    window.sessionStorage.setItem('userId', this.data.userId);
    if (this.data.accessToken) {
      var token = this.data.accessToken//setting token for Facebook login
    }else {
      token = this.data.token//setting token for login to backend DB
    }
    let userId = this.data.userId
    console.log("your token is", token)
    console.log("your userId is", userId)
    this.userService.loggedIn = true
    this.BuilderService.token = token
    this.BuilderService.userId = userId
    this.BuilderService.pollSet.userId = userId
    this.BuilderService.meme.userId = userId
  }

  forgot() {
    this.navCtrl.push(RegisterPage)
  }

  fbLogin(){
    if(this.platform.is("cordova")){
    // Login with permissions, Logging in if Cordova is available
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
    .then( (res: FacebookLoginResponse) => {

        // The connection was successful
        if(res.status == "connected") {

            // Get user ID and Token
            this.data = res.authResponse
            this.mobileStorageSet()

            // Get user infos from the API
            this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

                // Get the connected user details
                var gender    = user.gender;
                var birthday  = user.birthday;
                var name      = user.name;
                var email     = user.email;

                console.log("=== USER INFOS ===");
                console.log("Gender : " + gender);
                console.log("Birthday : " + birthday);
                console.log("Name : " + name);
                console.log("Email : " + email);

                // => Open user session and redirect to the next page
                this.navCtrl.setRoot(DashboardPage)

            });

        } 
        // An error occurred while loging-in
        else {

            console.log("An error occurred...");

        }

    })
    .catch((e) => {
        console.log('Error logging into Facebook', e);
    });
  }else{
    //Login via browser platform if cordova is not available
    console.log("submit login to facebook");
    FB.login((response)=>
        {
          console.log('submitLogin',response);
          if (response.authResponse)
          {
            this.data = response.authResponse
            this.coreStorageSet()
            //login success
            //login success code here
            //redirect to DashBoard page
            console.log("Logged in with Facebook", response.authResponse)
            this.navCtrl.setRoot(DashboardPage)

           }
           else
           {
           console.log('User login failed');
         }
      });
  }
}

  onLogin(){
    this.userService.login(this.user)
      .subscribe(
        (response: any) => {
          this.data = response
          console.log("response", this.data)
          if (this.platform.is("iphone" || "android" || "mobile" || "cordova")) { //checking platform, setting storage with ionic
            this.mobileStorageSet()
          } else { // setting session storage for all other devices such as desktop, windows, mobileweb, browsers
            this.coreStorageSet()
          }
          this.navCtrl.setRoot(DashboardPage);
        })
  }

  noLogin() {
    this.navCtrl.setRoot(DashboardPage)
  }

}
