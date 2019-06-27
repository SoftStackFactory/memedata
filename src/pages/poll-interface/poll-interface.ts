import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PollResultsPage } from '../poll-results/poll-results'
import { PollInterfaceProvider } from '../../providers/poll-interface-provider/poll-interface-provider';
import { Slides, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { ResultsServiceProvider } from '../../providers/results-service/results-service';


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
  index = 0
  userResponse:any = {
    memeId:"",
    userId:"",
    pollId:"",
    choice:""
    }
  
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public pollInterfaceProvider: PollInterfaceProvider,
              public resultsProvider: ResultsServiceProvider,
              public events: Events) {

  this.meme = this.pollInterfaceProvider.memes
  this.memeCount = this.meme.length

  events.subscribe('answerSaved', ()=> {
    if(this.questionNumber === this.totalQuestions) {
        this.resultsProvider.getMemeAnswers()
    }
  })
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
        console.log(this.resultsProvider.userAnswers)
        this.pollComplete = true       
        for(let i=0; i <= this.resultsProvider.userAnswers.length - 1; i++) {
          this.pollInterfaceProvider.saveMemeAnswers(this.pollInterfaceProvider.memes[i].id, this.userResponse, i+1)
        }     
    } else {
        this.questionNumber = this.questionNumber + 1
    }
  }

  button(direction) {
    if (!this.pollComplete) {
      this.userResponse = {
        memeId: this.pollInterfaceProvider.memes[this.index].id,
        userId: this.pollInterfaceProvider.memes[this.index].userId,
        pollId: this.pollInterfaceProvider.memes[this.index].pollId,
        choice: direction
      }

      this.pollInterfaceProvider.saveMemeAnswers(this.pollInterfaceProvider.memes[this.index].id, this.userResponse)
      this.resultsProvider.userAnswers.push(this.userResponse)
      this.progress = this.progress + this.percent
      this.progressBar(this.progress)
      this.slides.slideNext()
      this.index += 1
    }
  }

// swipeEvent(e) {
//   this.button()
//     if (e.direction == 2) {
//        this.userResponse = {
//         memeId:"0001",
//         userId:"",
//         choice:"left",
//         id:""
//       }
//       this.answers.push(this.userResponse)
//     } 
//     else if (e.direction == 4){
//       this.userResponse = {
//         memeId:"0001",
//         userId:"",
//         choice:"right",
//         id:""
//       }
//       this.answers.push(this.userResponse)
  
//     }
//   }
}


