import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { SpinnerServiceProvider } from '../spinner-service/spinner-service';

@Injectable()
export class DashboardServiceProvider {
  
  categories = ['sports', 'politics', 'education', 'technology', 'travel', 'lifestyle', 'fashion', 'comedy'];
  selectedCategory:string;
  polls:any = [];
  memes:any = [];
  displayedPolls:any = [];
  selectedPoll:any =[];
  
  // API endpoints for pulling poll data.
  accessToken:string = '?access_token='+'b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I'
  // These endpoints are used to serve to a phone withthe devapp. Uncomment these, and comment out the above versions.
  // Change the below ip address to the ip address you are connecting from.
  pollsApi:string = 'https://memepoll.herokuapp.com/api/pollSets'+`${this.accessToken}`;
  memesApi:string = 'https://memepoll.herokuapp.com/api/memes'+`${this.accessToken}`;
  categoryFilter:string = '?filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22'+`${this.selectedCategory}`+'%22%7D%7D';
  categoryApi:string = 'https://memepoll.herokuapp.com/api/pollSets?filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22travel%22%7D%7D&access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I';

  catFilterA:string = 'https://memepoll.herokuapp.com/api/pollSets?filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22';
  catFilterB:string = '%22%7D%7D&access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I';

  constructor(public http: HttpClient,
              public events: Events,
              public spinnerService: SpinnerServiceProvider) {
    console.log('Hello DashboardServiceProvider Provider');
  }

  // Pulling Poll Data

  pullAllPolls(){
    this.spinnerService.spinner = true;
    this.http.get(`${this.pollsApi}`).subscribe((response) => {
      // log the http request response
      this.spinnerService.spinner = false;
      console.log(response);
      this.polls = [];
      this.polls = response;
      for (let i=0; i <10; i++) {
        this.displayedPolls.push(response[this.displayedPolls.length]);
      }
      // Log the polls currently being displayed in the template
      console.log(this.displayedPolls);
      this.http.get(`${this.memesApi}`).subscribe((response) => {
        this.memes = response;
        console.log('dash$ memes', response);
      });
    });
  }

  pullAllMemes(){
    this.memes = [];
    this.http.get(`${this.memesApi}`).subscribe((response) => {
      this.memes = response;
      console.log('dash$ memes', this.memes);
    });
  }

  filterPollsByCategory(category) {
    this.spinnerService.spinner = true;
    this.selectedCategory = category;
    this.http.get(`https://memepoll.herokuapp.com/api/pollSets?filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22${this.selectedCategory}%22%7D%7D&access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I`)
      .subscribe((response) => {
        this.spinnerService.spinner = false;
        this.polls = [];
        this.displayedPolls = [];
        this.polls = response;
        // Log the polls object, which is also the http request response
        console.log(this.polls);
        for (let i=0; i <10; i++) {
          this.displayedPolls.push(response[this.displayedPolls.length]);
        }
    // Log the polls currently being displayed in the template
    console.log(this.displayedPolls);
    });
  }


  // Logic for the infinite scroll 

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {      
      for (let i = 0; i < 10; i++) {
        if(this.polls.length>this.displayedPolls.length){
        this.displayedPolls.push( this.polls[this.displayedPolls.length] );
        } else {
          infiniteScroll.loadingText = "No more polls...";
              // infiniteScroll.enable(false);
              // potential ionic bug related to re-enabling infinite-scroll 
              // once enable has been set to false
        }
      }
      console.log(event, 'Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
