import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardServiceProvider } from '../dashboard-service/dashboard-service';
import { Events, ToastController } from 'ionic-angular';
import { SpinnerServiceProvider } from '../spinner-service/spinner-service';

@Injectable()
export class SearchbarServiceProvider {

  searchTerm:string;

  constructor(public http: HttpClient, 
              public dash$: DashboardServiceProvider, 
              public events: Events, 
              public toastCtrl: ToastController,
              public spinnerService: SpinnerServiceProvider) {
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'No Search Results',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  setFilteredItems(){
    this.spinnerService.spinner = true
    if (this.searchTerm) {
      this.searchTerm = this.searchTerm.toLowerCase();
      let getKeywordsAPI = "https://ssf-memedata.herokuapp.com/api/pollSets?filter=%7B%22where%22%3A%7B%22pollKeywords%22%3A%22" + this.searchTerm + "%22%7D%2C%22limit%22%3A100%7D"
      this.events.publish('search success');
  
      this.http.get(getKeywordsAPI)
      .subscribe((response) => {
        console.log(response)
  
        this.dash$.displayedPolls = []
  
        this.dash$.polls = response
        this.spinnerService.spinner = false
  
        for (let i=0; i < 10; i++) {
          this.dash$.displayedPolls.push(response[i]);
        }
  
        if(this.dash$.polls.length == 0) {
          this.presentToast();
          console.log('No Search Results');
        }
      })
    }else {
      this.presentToast()
      this.spinnerService.spinner = false
    }
    }


}
