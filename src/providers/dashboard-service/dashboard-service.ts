import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DashboardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DashboardServiceProvider {
  
  // categories = ['sports', 'politics', 'education', 'technology', 'travel', 'lifestyle', 'fashion', 'comedy'];
  selectedCategory:string;
  categories = ['sports', 'politics', 'education', 'technology', 'travel'];
  polls:any = [];
  displayedPolls:any = [];
  // API endpoints for pulling poll data.
  pollsApi:string = 'http://localhost:3000/api/pollSets?access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I';
  categoryFilter:string = '&filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22'+`${this.selectedCategory}`+'%22%7D%7D';
  catFilterA:string = 'http://localhost:3000/api/pollSets?access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I&filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22';
  catFilterB:string = '%22%7D%7D';
  // These endpoints are used to serve to a phone withthe devapp. Uncomment these, and comment out the above versions.
  // Change the below ip address to the ip address you are connecting from.
    // pollsApi:string = 'http://192.168.1.94:3000/api/pollSets?access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I';
    // catFilterA:string = 'http://192.168.1.94:3000/api/pollSets?access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I&filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22';

  constructor(public http: HttpClient) {
    console.log('Hello DashboardServiceProvider Provider');
  }

  // Pulling Poll Data

  pullAllPolls(){
    this.http.get(`${this.pollsApi}`).subscribe((response) => {
      // log the http request response
      console.log(response);
      this.polls = [];
      this.polls = response;
      for (let i=0; i <10; i++) {
        this.displayedPolls.push(response[this.displayedPolls.length]);
      }
      // Log the polls currently being displayed in the template
      console.log(this.displayedPolls);
      });
  }

  filterPollsByCategory(category) {
    this.selectedCategory = category;
    this.http.get(`${this.catFilterA}`+this.selectedCategory+`${this.catFilterB}`).subscribe((response) => {
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
