import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DashboardServiceProvider } from '../../providers/dashboard-service/dashboard-service';
import { PollBuilderPage } from '../poll-builder/poll-builder';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { PollInterfaceProvider } from '../../providers/poll-interface-provider/poll-interface-provider';
import { PollInterfacePage } from '../poll-interface/poll-interface';
import { PollHistoryPage } from '../poll-history/poll-history';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: HttpClient, 
              public dash$: DashboardServiceProvider, 
              public events: Events, 
              public BuilderService: PollBuilderServiceProvider,
              public pollInterfaceProvider: PollInterfaceProvider) {

    events.subscribe('search success', ()=> {
      this.content.scrollToTop();    
    })

    events.subscribe('getMemes', ()=> {
      this.navCtrl.push(PollInterfacePage)   
    })
  }

  // On Page load

  ionViewDidLoad() {
    this.tab = "Home"
    console.log('ionViewDidLoad DashboardPage');
    this.pullAllPolls();
  }

  tab = "Home"

  // Pulling Poll Data

  pullAllPolls() {
    this.dash$.pullAllPolls();
    this.dash$.pullAllMemes();
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
    this.navCtrl.setRoot(PollBuilderPage);
  }
  goToMyPolls() {
    this.navCtrl.setRoot(PollHistoryPage);
  }

  startPoll(id) {
    console.log(id)
    this.pollInterfaceProvider.getMemes(id)
  }
  
}


