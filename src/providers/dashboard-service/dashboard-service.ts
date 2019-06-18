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
  
  pollsApi:string = 'https://ssf-memedata.herokuapp.com/api/pollSets?filter=%7B%22limit%22%3A200%7D'
  memesApi:string = 'https://ssf-memedata.herokuapp.com/api/memes?filter=%7B%22limit%22%3A200%7D'

  constructor(public http: HttpClient,
              public events: Events,
              public spinnerService: SpinnerServiceProvider) {
  }

  pullAllPolls(){
    this.spinnerService.spinner = true;
    this.http.get(`${this.pollsApi}`).subscribe((response) => {
      this.spinnerService.spinner = false;
      console.log(response);
      this.polls = [];
      this.polls = response;

      for (let i=0; i <10; i++) {
        this.displayedPolls.push(response[this.displayedPolls.length]);
      }
      console.log(this.displayedPolls);
    });
  }

  filterPollsByCategory(category) {
    this.spinnerService.spinner = true;
    this.selectedCategory = category;
    this.http.get(`https://ssf-memedata.herokuapp.com/api/pollSets?filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22${this.selectedCategory}%22%7D%7D`)
      .subscribe((response) => {
        this.spinnerService.spinner = false;
        this.polls = [];
        this.displayedPolls = [];
        this.polls = response;
        console.log(this.polls);

        for (let i=0; i <10; i++) {
          this.displayedPolls.push(response[this.displayedPolls.length]);
        }
        console.log(this.displayedPolls);
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      for (let i = 0; i < 10; i++) {
        if(this.polls.length>this.displayedPolls.length){
        this.displayedPolls.push( this.polls[this.displayedPolls.length] );
        } else {
          infiniteScroll.loadingText = "No more polls...";
        }
      }
      infiniteScroll.complete();
    }, 500);
  }

}
