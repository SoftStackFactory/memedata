import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SearchbarServiceProvider } from '../searchbar-service/searchbar-service'
import { PollBuilderServiceProvider } from '../poll-builder-service/poll-builder-service';
import { FacebookOathProvider } from '../facebook-oath/facebook-oath';

@Injectable()
export class UserProvider {


  constructor(
    public http: HttpClient,
    public BuilderService: PollBuilderServiceProvider,
    public search$: SearchbarServiceProvider,
    public storage: Storage,
    public fbOath: FacebookOathProvider,
    ) {
    console.log('Hello UserProvider Provider');
  }

  data: any;

  userRegister = {
    firstName: '',
    lastName: '',
    username: '',
    email:'',
    password:'',
    dob:'',
    gender:'',
    zip:'',
    id: 'none'
  }

  userLogin = {
    email:'',
    password:''
  }

  userDetails: any;

  loggedIn: boolean = false

  baseUrl: string = 'https://ssf-memedata.herokuapp.com/api/appUsers';

  mobileStorageSet(){
    if(this.data.accessToken){
      this.storage.set("token", this.data.accessToken);
      this.storage.set("userId", this.data.userID)
      console.log("your token is", this.data.accessToken)
      console.log("your userId is", this.data.userID)
    }else{
      this.storage.set("token", this.data.token)
      this.storage.set("userId", this.data.userId);
      console.log("your token is", this.data.token)
      console.log("your userId is", this.data.userId)
    }
    this.storage.get('token').then((val) => { //getting from ionic storage for android/iphone/mobile platform
      console.log('got your token', val);
    this.BuilderService.token = val})
    this.storage.get('userId').then((val) => {
      console.log('got your userId', val);
    this.loggedIn = true
    this.BuilderService.userId = val
    this.BuilderService.pollSet.userId = val
    this.BuilderService.meme.userId = val})
  }

  coreStorageSet(){// setting session storage for all other devices such as desktop, windows, mobileweb, browsers, non Cordova
    if (this.data.accessToken) {
      window.sessionStorage.setItem('access token', this.data.accessToken)//setting storage for Facebook login response
      window.sessionStorage.setItem('userId', this.data.userID)
      var token = this.data.accessToken//setting token for Facebook login
      var userId = this.data.userID
    }else{
      window.sessionStorage.setItem('token', this.data.token);//setting storage for login to backend DB
      window.sessionStorage.setItem('userId', this.data.userId)
      token = this.data.token//setting token for login to backend DB
      userId = this.data.userId
    };
    console.log("your token is", token)
    console.log("your userId is", userId)
    this.loggedIn = true
    this.BuilderService.token = token
    this.BuilderService.userId = userId
    this.BuilderService.pollSet.userId = userId
    this.BuilderService.meme.userId = userId
  }

  clearUserDetails() {
    this.loggedIn = false
    this.fbOath.fbLoggedIn = false
    this.storage.clear()
    window.sessionStorage.clear();
    this.BuilderService.token = ""
    this.BuilderService.userId = ""
    this.BuilderService.pollSet.userId = ""
    this.BuilderService.meme.userId = ""
  }

  register(userData) {
    return this.http.post(this.baseUrl, userData );
  }

  login(userData) {
    return this.http.post(this.baseUrl + "/login", userData);
  }

  logout(token) {
    return this.http.post(this.baseUrl + "/logout?access_token=" + token, {});
  }

  getUserDetails() {
    return this.http.get(this.baseUrl + "/" + this.BuilderService.userId + "?access_token=" + this.BuilderService.token)
  }

}
