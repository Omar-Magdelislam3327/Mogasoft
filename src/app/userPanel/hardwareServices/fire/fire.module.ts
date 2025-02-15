import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FireRoutingModule } from './fire-routing.module';
import { FireComponent } from './fire.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FireComponent
  ],
  imports: [
    CommonModule,
    FireRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule
  ]
})
export class FireModule { }
