import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostingRoutingModule } from './hosting-routing.module';
import { HostingComponent } from './hosting.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    HostingComponent
  ],
  imports: [
    CommonModule,
    HostingRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule
  ]
})
export class HostingModule { }
