import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MobileComponent
  ],
  imports: [
    CommonModule,
    MobileRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule
  ]
})
export class MobileModule { }
