import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DashboardServiceProvider } from '../../providers/dashboard-service/dashboard-service';
import { PollBuilderPage } from '../poll-builder/poll-builder';


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public dash$: DashboardServiceProvider) {
    console.log('Hello DashboardPage');
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


