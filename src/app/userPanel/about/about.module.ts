import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FooterModule } from 'src/app/shared/footer/footer.module';


@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    NavbarModule,
    TranslateModule,
    CarouselModule,
    FooterModule
  ]
})
export class AboutModule {
  constructor() {
  }
}
