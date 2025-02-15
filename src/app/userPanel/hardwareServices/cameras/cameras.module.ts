import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamerasRoutingModule } from './cameras-routing.module';
import { CamerasComponent } from './cameras.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CamerasComponent
  ],
  imports: [
    CommonModule,
    CamerasRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule
  ]
})
export class CamerasModule { }
