import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardServiceProvider } from '../dashboard-service/dashboard-service';
import { Events, ToastController } from 'ionic-angular';

/*
  Generated class for the SearchbarServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchbarServiceProvider {

  searchTerm:string;
  polls:any = [];
  keyMatch:any = [];
  matched:any = [];

  pollsApi:string = 'https://memepoll.herokuapp.com/api/pollSets?access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I';

  constructor(public http: HttpClient, public dash$: DashboardServiceProvider, public events: Events, public toastCtrl: ToastController) {
    console.log('Hello SearchbarServiceProvider Provider');
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
    this.http.get(this.pollsApi).subscribe((response) => {
      this.polls = [];
      this.keyMatch = [];
      this.matched = [];
      this.polls = response;
      this.keyMatch = response;
      console.log(this.polls);
      this.polls = this.polls.filter(poll => poll.pollCategory === this.searchTerm);
      for(let i = 0; i < this.keyMatch.length; i++){
      let keywords = this.keyMatch[i].pollKeywords;
        for(let j = 0; j<keywords.length; j++){
          if(keywords[j] === this.searchTerm){
            this.matched.push(this.keyMatch[i]);
          }
        }
      }
      console.log('polls', this.polls);
      console.log('matched', this.matched);
      this.searchTerm = '';
      if(this.polls.length > 0){
        this.events.publish('search success');
        this.dash$.polls = this.polls;
        this.dash$.displayedPolls = [];
        for (let i=0; i <10; i++) {
          this.dash$.displayedPolls.push(this.polls[this.dash$.displayedPolls.length]);
        }        
      } else if(this.matched.length > 0){
        this.events.publish('search success');
        this.dash$.polls = this.matched;
        this.dash$.displayedPolls = [];
        for (let i=0; i <10; i++) {
          this.dash$.displayedPolls.push(this.matched[this.dash$.displayedPolls.length]);
        } 
      } else {
        this.presentToast();
        console.log('No Search Results');
      }
    })
  }
    
//   var sample = [1, 2, 3] // yeah same array
// // es5
// var result = sample.filter(function(elem){
//     return elem !== 2;
// })
// console.log(result)
// // es6
// var result = sample.filter(elem => elem !== 2)
// /* output */
// [1, 3]

}
