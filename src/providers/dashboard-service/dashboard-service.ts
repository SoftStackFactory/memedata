import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DashboardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DashboardServiceProvider {

  pollsApi:string = 'http://localhost:3000/api/pollSets?access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I';
  selectedCategory:string;
  categoryFilter:string = '&filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22'+`${this.selectedCategory}`+'%22%7D%7D';

  catFilterA:string = 'http://localhost:3000/api/pollSets?access_token=b9mlT8uvLmKJj38eoquDnslnogB07V0mYpd4FDhAhRfT9twx9uf5REChqXEkMK2I&filter=%7B%22where%22%3A%7B%22pollCategory%22%3A%22';
  catFilterB:string = '%22%7D%7D';


  categories = ['sports', 'politics', 'education', 'technology', 'travel', 'lifestyle', 'fashion', 'comedy'];

  polls:any = [{'pollTitle':'Practice',
               'pollDescription':'This is the description of the poll',
               'coverImage':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABRCAMAAAAHMq/cAAAAnFBMVEX///8AAIjMAAAAAH0AAHrz8/je3urst7fPz+LHAAD88/MAAILy0dEAAIX++vrPNjY8PJXU1OUwMJDo6PJra6pAQJfRPz+1tdSKirkqKo7UUFDTSEj67OyVlcDdfX19fbJeXqOqqsujo8jloaESEon239/ExNtkZKZNTZweHox2dq/ac3PhjIxGRprPKirik5PNGhpXV6LswMDoq6sZaJggAAAEKUlEQVRoge2a2WKqMBCGaQOtMMay6FHqUrW4tT1t9bz/ux2UJQGyYYJX/nelCB+TP5OZgGXdddcN5JgVdeWBJ9eAyTQ+gm1WEbn4xlXQ9L1BFo0QfjArHFLXf3cf5XJ/+zUqbBoqFQypUZwqYKVgpwpW2AHVwwNakTv0VcKVyqOo1qgLqpQrIPf4VMNaUFh+J8FK7XUg03H2qzaMxPaOrX1/gCT0/TgBqDwhPrZ0/aNLXP+kiQV4uQ4iZ+A4UTAehvSchgnhUnK9+0ywtKyF4e2Jnj5Ob4ih/C/atnS9ISzwA6uu6I2MZUKyqpLrzWDB3mlQpQr8ImB41M71RrCwz4I6a1hcFD7KY/9uhQURCynjKuIFJKsquN4EFqy5VOnSUZ5Vuk/B9UawBFQk7+Cw9J/c9Qaw8ITJUw5jMR1hWRzyboEFPSFWUKZpmBfHpK43gIWEVJZ1IA9QZtU/3WPFEqwJWYbKrCpzvT4WHrJpSo3JhUlWlbheHwveJFgRVQOUi7bE9dpYEPNzaS66NEHj/KDY9bpYtjg7XAT0D6AoNISu18OCQ7NwaKryExznledG5HotLPTBAakqqT7KLj+86AYLS/IoO1rpw+RL6KATLDxk1lgM1VsXlD/OM38YNaK1H/mZYlEFYW3XUP9lkj8Q3/U6g1gIjhyii4bN6+J99i++6zuvt6wlo/0ssirX9Z3XW9aO1RXnWZXrehOFzZxHdNGkYa3Lj7KsynO9icJGPCOfENBCWZdWrKSvXWFh6VId0NrOj+e+tlgbvc0PK2D6WEi6VDc45zFQIWYFTB8rcaKoLZkzX5I/vhjhMtFiJEnSOmKUH2eMGsdQs79i3Fld7x1hSQtnsbzGMBrCGgluKtfg66WbQfyrhZX669s8FtS23K7Rj3EspFx43RLLHgvupqwvw1j2VnAzddXabF0sJC4f1DWbuuawNDNDRfSWvSaW3XrVEWi2cGVY2IYDSF/jYbVGUVl9CRbanTPR05FZWXYUrLMWQqyyDmZXvGWwduyLX6+NCIu63V40jshIyqpoKsCi3gD2ROGSbU9eoZPLxwqp1UQwP82PoVVsEzKxRhSWIFritvVavXKxqNeljiBatnbdwNLghestss6NBdHqwFpnne3Fnomj8l1xLLAW972Ynn74eSsvoRxRPtUs4Ln65md5CFdp97eKRelB8q7nWp2ESzUABvHS081EzPbiNCoIMJ/jraJn1MBCZurSqjaNxaftdxBIcaO5jbxsO5X6DqL1VyPIfDad5bs31FcjohTVHdaAkncqmljqGxtrLqn5GvJHqUKt+ej9vhCRzvqTOsVJ5CRNYckepQSLuXfqbuhzele1ZFrlDROLMnzGJUmgbOnMSBZWneq8eXiwUWuJ9+UlWHU9LmasE6Og11oa/U+/pg37w9O77jKq/59JUqbOOHqeAAAAAElFTkSuQmCC'
              }];

  constructor(public http: HttpClient) {
    console.log('Hello DashboardServiceProvider Provider');
  }

  pullAllPolls(){
    this.http.get(`${this.pollsApi}`).subscribe((response) => {
      // console.log(response);
      this.polls = [];
      this.polls.push(response);
      // console.log(this.polls);
      });
  }

  filterPollsByCategory(category) {
    // console.log(category);
    // console.log(this.selectedCategory);
    this.selectedCategory = category;
    this.http.get(`${this.catFilterA}`+this.selectedCategory+`${this.catFilterB}`).subscribe((response) => {
    this.polls = [];
    this.polls.push(response);
    console.log(this.polls);
    });
  }

}
