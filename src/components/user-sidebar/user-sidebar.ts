import { Component } from '@angular/core';

/**
 * Generated class for the UserSidebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-sidebar',
  templateUrl: 'user-sidebar.html'
})
export class UserSidebarComponent {

  text: string;

  constructor() {
    console.log('Hello UserSidebarComponent Component');
    this.text = 'Hello World';
  }

}
