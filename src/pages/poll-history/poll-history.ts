import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { PollBuilderPage } from '../poll-builder/poll-builder';
import { DashboardPage } from '../dashboard/dashboard';
import { PollhistoryProvider } from '../../providers/pollhistory/pollhistory';
/**
 * Generated class for the PollHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poll-history',
  templateUrl: 'poll-history.html',
})
export class PollHistoryPage {

  @ViewChild(Content) content: Content;

  // PLACE HOLDER STUFF
  // poll: string = "poll-history";
  // polls: any[]=[];

  // pollCategory: string;
  // pollTitle: string;
  // memeImage: "../assets/imgs/sample.jpg";
  // segments = "featured";

  // example = [
  //   {
  //   memeImage: "..//assets/imgs/sample.jpg",
  //   title: "some awesomeness",
  //   description: "really cool stuff",
  //   },
  //   {
  //     memeImage: "..//assets/imgs/sample.jpg",
  //     title: "some awesomeness",
  //     description: "really cool stuff",
  //     },
  //     {
  //       memeImage: "..//assets/imgs/sample.jpg",
  //       title: "some awesomeness",
  //       description: "really cool stuff",
  //       },
  //       {
  //         memeImage: "..//assets/imgs/sample.jpg",
  //         title: "some awesomeness",
  //         description: "really cool stuff",
  //         }

  // ]


  // takenPolls = [
  //   'Pokemon Poll',
  //   'Yugioh Poll',
  //   'Digimon Poll',
  //   'Are You A Robot Poll?',
  //   'Futurama Poll',
  //   'Star Wars Poll'
  // ]

  // createdPolls = [
  //   'Bob The Builders Favorite Tools Poll',
  //   'Doras Bagpack Poll',
  //   'NBA Champions Poll',
  //   'Metgala Who Wore It Best Poll?'
  // ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public dash$: PollhistoryProvider, public events: Events, public BuilderService: PollhistoryProvider ) {
    console.log('Hello DashboardPage');
    events.subscribe('search success', ()=> {
      this.content.scrollToTop();    
    })
  }

  // On Page load

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.pullAllPolls();
  }

  // Pulling Poll Data

  pullAllPolls() {
    this.dash$.pullAllPolls();
  }

  filterPollsByCategory(category){
    this.dash$.filterPollsByCategory(category);
    this.content.scrollToTop();
  }

  // Navigation Functions

  goToHome() {
    this.navCtrl.setRoot(DashboardPage);
  }
  goToCreate() {
    this.navCtrl.push(PollBuilderPage);
  }
  goToMyPolls() {
    this.navCtrl.setRoot(DashboardPage);
  }
   
  }
  