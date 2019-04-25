import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollResultsPage } from './poll-results';

@NgModule({
  declarations: [
    PollResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(PollResultsPage),
  ],
})
export class PollResultsPageModule {}
