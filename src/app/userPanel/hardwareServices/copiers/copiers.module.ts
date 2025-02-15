import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CopiersRoutingModule } from './copiers-routing.module';
import { CopiersComponent } from './copiers.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CopiersComponent
  ],
  imports: [
    CommonModule,
    CopiersRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule
  ]
})
export class CopiersModule { }
