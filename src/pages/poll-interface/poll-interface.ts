import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from '@ionic-angular';
import { ViewChild } from '@angular/core'


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
  
  meme:any
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  this.meme = {
        "image": "",
        "topText": "Top Text",
        "bottomText": "Bottom Text",
        "description": ""
      }
  }

  public hideOverlay() {
    this.overlayHidden = true;
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PollInterfacePage');
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
      }
    }
  }

  button() {
    if (!this.pollComplete) {
      let random = Math.floor(Math.random() * 500) + 1
      this.imgUrl = "https://picsum.photos/id/" + random + "/360/640"
      console.log(this.imgUrl)

      this.progress = this.progress + this.percent
      this.progressBar(this.progress)
    }

  }
  imgCheck() {
    let img = document.querySelector('#img > img')
    console.log(img.clientHeight)
  }

  swipeEvent(event){
    alert('swipe');
}


  // this.progress = this.progress + this.percent
  // this.progressBar(this.progress)
}
