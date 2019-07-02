import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Events, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { DashboardServiceProvider } from '../../providers/dashboard-service/dashboard-service';
import { PollBuilderPage } from '../poll-builder/poll-builder';
import { PollBuilder2Page } from '../poll-builder2/poll-builder2';
import { PollBuilderServiceProvider } from '../../providers/poll-builder-service/poll-builder-service';
import { PollInterfaceProvider } from '../../providers/poll-interface-provider/poll-interface-provider';
import { PollInterfacePage } from '../poll-interface/poll-interface';
import { PollHistoryPage } from '../poll-history/poll-history';
import { SpinnerServiceProvider } from '../../providers/spinner-service/spinner-service';
import { ResultsServiceProvider } from '../../providers/results-service/results-service';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: HttpClient, 
              public alertCtrl: AlertController,
              public dash$: DashboardServiceProvider, 
              public events: Events, 
              public BuilderService: PollBuilderServiceProvider,
              public pollInterfaceProvider: PollInterfaceProvider,
              public spinnerService: SpinnerServiceProvider,
              public resultsProvider: ResultsServiceProvider,
              public menuCtrl: MenuController
              ) {

    events.subscribe('search success', ()=> {
      // this.content.scrollToTop();    
    })

    events.subscribe('getMemes', ()=> {
      this.navCtrl.push(PollInterfacePage)   
    })
  }

  // On Page load

  ionViewDidLoad() {
    this.tab = "Home"
    console.log('ionViewDidLoad DashboardPage');
    this.dash$.polls = [];
    this.dash$.displayedPolls = [];
    this.pullAllPolls();
  }

  ionViewDidLeave() {
    this.spinnerService.spinner = false
  }

  tab = "Home"

  // Pulling Poll Data

  pullAllPolls() {
    this.dash$.pullAllPolls();
    // this.dash$.pullAllMemes();
  }

  filterPollsByCategory(category){
    this.dash$.filterPollsByCategory(category);
    this.content.scrollToTop();
  }

  // Navigation Functions

  goToHome() {
    this.menuCtrl.enable(false)
    this.navCtrl.setRoot(DashboardPage);
  }

  goToCreate() {
      const confirm = this.alertCtrl.create({
        title: 'Create a new poll?',
        message: 'Would you like to use your camera or choose from photo album?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel clicked');
              this.menuCtrl.enable(false)
              this.navCtrl.setRoot(DashboardPage)
            }
          },
          {
            text: 'Camera',
            handler: () => {
              console.log('Camera clicked');
              this.BuilderService.takePicture()
              this.navCtrl.setRoot(PollBuilder2Page)
            }
          },
          {
            text: 'Album',
            handler: () => {
              console.log('File clicked');
              this.BuilderService.getImage()
              this.navCtrl.setRoot(PollBuilder2Page)
            }
          }
        ]
      });
      confirm.present();
  }

  goToMyPolls() {
    this.navCtrl.setRoot(PollHistoryPage);
  }

  pollInfo(poll) {
    this.pollInterfaceProvider.pollInfo = poll
    console.log("poll info", this.pollInterfaceProvider.pollInfo)
  }

  startPoll(id) {
    console.log(id)
    this.resultsProvider.userAnswers = []
    this.pollInterfaceProvider.getMemes(id)
  }
  
}


