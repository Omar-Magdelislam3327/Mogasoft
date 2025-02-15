import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueueRoutingModule } from './queue-routing.module';
import { QueueComponent } from './queue.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    QueueComponent
  ],
  imports: [
    CommonModule,
    QueueRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule
  ]
})
export class QueueModule { }
