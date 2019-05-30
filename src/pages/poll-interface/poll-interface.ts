import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { PollResultsPage } from '../poll-results/poll-results'
import { DashboardServiceProvider } from '../../providers/dashboard-service/dashboard-service';
// import { Slides } from '@ionic-angular';
// import { ViewChild } from '@angular/core';


/**
 * Generated class for the PollInterfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poll-interface',
  templateUrl: 'poll-interface.html',
})
export class PollInterfacePage {

  imgUrl:any
  progress:any = 0
  questionNumber:any = 1
  totalQuestions:any = 10
  pollComplete:boolean = false
  percent:number = 10
  check:number

  overlayHidden: boolean = false;
  overlayInfo: boolean = true;
  
  meme:any
  selectedPoll:any = this.dash$.selectedPoll;
  memes:any = this.dash$.memes;

  public swipe: number = 0;

  answers:any = [
  
  ]
  
  userResponse:any = {
    memeId:"",
    userId:"",
    choice:"",
    id:""
    }
  

  slides:any 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public dash$: DashboardServiceProvider) {

    this.slides = [1,2,3,4,5,6,7,8,9,10]

  this.meme = {
        "image": "",
        "topText": "Top Text",
        "bottomText": "Bottom Text",
        "description": ""
      }
  }

  public hideOverlay() {
    this.overlayHidden = true;
    this.overlayInfo = true;
}

overlayHiddenInfo (){
  this.overlayInfo = false;
  
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PollInterfacePage', this.selectedPoll);
    let random = Math.floor(Math.random() * 500) + 1
    this.imgUrl = "https://picsum.photos/id/" + random + "/360/640"
       // this.pollSetup(30, 0)


  }

  pollSetup(totalQuestions, text) {
    // this.top = this.mockMemeText[text].top
    // this.bottom = this.mockMemeText[text].bottom
    this.totalQuestions = totalQuestions 
    this.percent = 100 / totalQuestions
    // this.check = this.percent * this.totalQuestions
    console.log(this.check)
  }

  progressBar(x) {
    if(x <= 100){
      document.getElementById("bar").style.width = "" + x + "%"
      if(this.questionNumber != this.totalQuestions) {
        this.questionNumber = this.questionNumber + 1
      }
      if(x >= 99.5) {
        console.log("Poll Done")
        this.pollComplete = true
        this.navCtrl.setRoot(PollResultsPage) 
        for(let i=0; i < this.answers.length; i++) {
          console.log(this.answers[i].response)
        }
      }
    }
  }

  button() {
    if (!this.pollComplete) {
      let random = Math.floor(Math.random() * 500) + 1
      this.imgUrl = "https://picsum.photos/id/" + random + "/360/640"
      this.progress = this.progress + this.percent
      this.progressBar(this.progress)

    }

  }
  imgCheck() {
    let img = document.querySelector('#img > img')
    console.log(img.clientHeight)
  }

//   swipeEvent(event){
//     alert('swipe');
// }
swipeEvent(e) {
  this.button()
    if (e.direction == 2) {
       this.userResponse = {
        memeId:"0001",
        userId:"",
        choice:"left",
        id:""
      }
      this.answers.push(this.userResponse)
    } 
    else if (e.direction == 4){
      this.userResponse = {
        memeId:"0001",
        userId:"",
        choice:"right",
        id:""
      }
      this.answers.push(this.userResponse)
  
    }
  }
}
  // this.progress = this.progress + this.percent
  // this.progressBar(this.progress)

