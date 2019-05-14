import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-poll-results',
  templateUrl: 'poll-results.html',
})
export class PollResultsPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  array:any = [1,2,3,4]
  suggestions:any = [1,2,3,4,5,6,7,8,9,10]

  left: any = 0
  right: any = 0

  bar1:number
  barPercent1:any
  barPercent2:any
  bar2:number
  responseColor:any

  meme = [
      {
      "id":"00001",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "Meme1",
      "userId": "string"
    },
    {
      "id":"00002",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "meme2",
      "userId": "string"
    },
    {
      "id":"00003",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "meme3",
      "userId": "string"
    },
    {
      "id":"00004",
      "pollID": "string",
      "topText": "string",
      "bottomText": "string",
      "image": "string",
      "description": "meme4",
      "userId": "string"
    }
  ]

  // answers:any = [
  //   {
  //     id: '00001',
  //     yes: 50,
  //     no: 50,
  //     alternate: ''
  //   },
  //   {
  //     id: '00002',
  //     yes: 25,
  //     no: 75,
  //     alternate: ''
  //   },
  //   {
  //     id: '00003',
  //     yes: 33,
  //     no: 77,
  //     alternate: ''
  //   },
  //   {
  //     id: '00004',
  //     yes: 77,
  //     no: 33,
  //     alternate: ''
  //   }
  // ]

  answers:any = [
    {
      id: '00001',
      choice: "right"
    },
    {
      id: '00001',
      choice: "left"
    },
    {
      id: '00002',
      choice: "right"
    },
    {
      id: '00002',
      choice: "left"
    },
    {
      id: '00001',
      choice: "right"
    },
    {
      id: '00001',
      choice: "right"
    },
    {
      id: '00003',
      choice: "left"
    },
    {
      id: '00001',
      choice: "left"
    },
    {
      id: '00003',
      choice: "right"
    },
    {
      id: '00003',
      choice: "left"
    },
    {
      id: '00001',
      choice: "left"
    },
    {
      id: '00002',
      choice: "right"
    },
    {
      id: '00004',
      choice: "left"
    },
    {
      id: '00004',
      choice: "right"
    },
    {
      id: '00001',
      choice: "right"
    },
    {
      id: '00001',
      choice: "right"
    },
    {
      id: '00001',
      choice: "right"
    },
    {
      id: '00001',
      choice: "right"
    },
    {
      id: '00001',
      choice: "right"
    },
    {
      id: '00001',
      choice: "right"
    },
    {
      id: '00002',
      choice: "right"
    },
    {
      id: '00002',
      choice: "right"
    },
    
  ]

  userResponse:any = [
    {
      id: "00001",
      choice: "right"
    },
    {
      id: "00002",
      choice: "left"
    },
    {
      id: "00003",
      choice: "right"
    },
    {
      id: "00004",
      choice: "right"
    }
  ]

  ionViewDidLoad() {
    // this.calPercent("00001")

  }



  calPercent(x) {
    let right = []
    let left = []

    for (let i=0; i<this.answers.length; i++) {
      if (x == this.answers[i].id) {
        if ("right" == this.answers[i].choice) {
          right.push(this.answers[i].choice)
        } else if ("left" == this.answers[i].choice) {
          left.push(this.answers[i].choice)
        }
      }
    }

  console.log(right.length)
  console.log(left.length)
  }

  calculateMemePercent(x) {

    let right = []
    let left = []

    for (let i=0; i<this.answers.length; i++) {
      if (x == this.answers[i].id) {
        if ("right" == this.answers[i].choice) {
          right.push(this.answers[i].choice)
        } else if ("left" == this.answers[i].choice) {
          left.push(this.answers[i].choice)
        }
      }
    }

    let totalTaken = right.length + left.length
    let yesPercent = (100 * right.length) / totalTaken;
    let noPercent = (100 * left.length) / totalTaken;

    this.bar1 = Math.round(yesPercent)
    this.bar2 = 100 - this.bar1
    this.barPercent1 = {'width': Math.round(yesPercent) + "%"}
    this.barPercent2 = {'width': Math.round(noPercent) + "%"}

    return this.barPercent1
  }

  // calculateMemePercent(x) {  
  //   let totalTaken = this.answers[x].yes + this.answers[x].no
  //   let yesPercent = (100 * this.answers[x].yes) / totalTaken;
  //   let noPercent = (100 * this.answers[x].no) / totalTaken;

  //   this.bar1 = Math.round(yesPercent)
  //   this.bar2 = 100 - this.bar1
  //   this.barPercent1 = {'width': Math.round(yesPercent) + "%"}
  //   this.barPercent2 = {'width': Math.round(noPercent) + "%"}

  //   return this.barPercent1
  // }


}

