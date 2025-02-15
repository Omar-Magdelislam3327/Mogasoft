import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from 'src/app/shared/footer/footer.module';


@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    FooterModule,
    CarouselModule,
    TranslateModule
  ]
})
export class HomeModule { }
