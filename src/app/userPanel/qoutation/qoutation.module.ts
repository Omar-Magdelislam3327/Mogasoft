import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QoutationRoutingModule } from './qoutation-routing.module';
import { QoutationComponent } from './qoutation.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QoutationComponent
  ],
  imports: [
    CommonModule,
    QoutationRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QoutationModule { }
