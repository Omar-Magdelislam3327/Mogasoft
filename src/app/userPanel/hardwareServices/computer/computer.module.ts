import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputerRoutingModule } from './computer-routing.module';
import { ComputerComponent } from './computer.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ComputerComponent
  ],
  imports: [
    CommonModule,
    ComputerRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule
  ]
})
export class ComputerModule { }
