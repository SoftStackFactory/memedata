import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';

declare var FB: any;

/*
  Generated class for the FacebookOathProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FacebookOathProvider {

  constructor(
    public http: HttpClient,
    public fb: Facebook,
    public platform: Platform
    ) {
    console.log('Hello FacebookOathProvider Provider');
      (window as any).fbAsyncInit = function() {//Facebook sdk for browser users
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
  }

fbLoggedIn: any = false;

userDetails: any;

fbFriends: any;

getFBUserDetails() {
  FB.api(
    '/me',
    'GET',
    {"fields":"id,name,email,first_name,last_name,gender,picture"},
    (response: any) => {
      this.userDetails = response
      console.log("User Details", this.userDetails)
    });
}

findMyFriends() {
  if(this.platform.is("cordova")) {
    this.fb.api("/me/friends", []).then((friends) => {
      // Get the connected user friends
      console.log("=== USER FRIENDS USING MEMEPOLL ===", friends);
      this.fbFriends = friends
  });
  }else {
  FB.api(
    '/me/friends',
    'GET',
    {},
    (response) => {
    console.log("My Friends Using MemePoll", response)
    this.fbFriends = response
    }
  );
  }
}


}
