import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { PollResultsPage } from '../poll-results/poll-results'
import { PollInterfaceProvider } from '../../providers/poll-interface-provider/poll-interface-provider';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'page-poll-interface',
  templateUrl: 'poll-interface.html',
})
export class PollInterfacePage {

  @ViewChild(Slides) slides: Slides;

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
  memeCount:any

  public swipe: number = 0;

  answers:any = []
  
  userResponse:any = {
    memeId:"",
    userId:"",
    choice:"",
    id:""
    }
  
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public pollInterfaceProvider: PollInterfaceProvider) {

  this.meme = this.pollInterfaceProvider.memes
  this.memeCount = this.meme.length
  }

  public hideOverlay() {
    this.overlayHidden = true;
    this.overlayInfo = true;
  }

  overlayHiddenInfo (){
    this.overlayInfo = false;
  }

  ionViewDidLoad() {
       this.pollSetup(this.memeCount, 0)
       this.slides.lockSwipeToPrev(true)
  }

  pollSetup(totalQuestions, text) {
    this.totalQuestions = totalQuestions 
    this.percent = 100 / totalQuestions
  }

  progressBar(x) {
    document.getElementById("bar").style.width = "" + x + "%"

    if(this.questionNumber === this.totalQuestions) {
        console.log("Poll Done")
        this.pollComplete = true
        this.navCtrl.setRoot(PollResultsPage) 
    } else {
        this.questionNumber = this.questionNumber + 1
    }
  }

  button() {
    if (!this.pollComplete) {
      this.progress = this.progress + this.percent
      this.progressBar(this.progress)
      this.slides.slideNext()
    }
  }

  imgCheck() {
    let img = document.querySelector('#img > img')
    console.log(img.clientHeight)
  }

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


