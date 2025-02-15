import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule
  ]
})
export class ServiceModule { }
