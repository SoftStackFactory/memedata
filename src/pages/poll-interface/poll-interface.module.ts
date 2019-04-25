import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollInterfacePage } from './poll-interface';

@NgModule({
  declarations: [
    PollInterfacePage,
  ],
  imports: [
    IonicPageModule.forChild(PollInterfacePage),
  ],
})
export class PollInterfacePageModule {}
