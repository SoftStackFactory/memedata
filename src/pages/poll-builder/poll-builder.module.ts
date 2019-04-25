import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollBuilderPage } from './poll-builder';

@NgModule({
  declarations: [
    PollBuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(PollBuilderPage),
  ],
})
export class PollBuilderPageModule {}
