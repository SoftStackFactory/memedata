import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollHistoryPage } from './poll-history';

@NgModule({
  declarations: [
    PollHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PollHistoryPage),
  ],
})
export class PollHistoryPageModule {}
