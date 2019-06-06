import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardServiceProvider } from '../dashboard-service/dashboard-service';
import { Events, ToastController } from 'ionic-angular';

@Injectable()
export class SearchbarServiceProvider {

  searchTerm:string;

  constructor(public http: HttpClient, 
              public dash$: DashboardServiceProvider, 
              public events: Events, 
              public toastCtrl: ToastController) {
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
    this.searchTerm = this.searchTerm.toLowerCase();
    let getKeywordsAPI = "https://memepoll.herokuapp.com/api/pollSets?filter=%7B%22where%22%3A%7B%22pollKeywords%22%3A%22" + this.searchTerm + "%22%7D%7D"
    let getKeywordsLimit = "https://memepoll.herokuapp.com/api/pollSets?filter=%7B%22where%22%3A%7B%22pollKeywords%22%3A%22" + this.searchTerm + "%22%7D%2C%22limit%22%3A10%7D"
    this.events.publish('search success');

    this.http.get(getKeywordsAPI)
      .subscribe((response) => {
        console.log(response)
        this.dash$.polls = response
  
        if(response.length == 0) {
          this.presentToast();
          console.log('No Search Results');
        }
    })

      this.http.get(getKeywordsLimit)
      .subscribe((response) => {
        console.log(response)
        this.dash$.displayedPolls = response
    })
  }

}
