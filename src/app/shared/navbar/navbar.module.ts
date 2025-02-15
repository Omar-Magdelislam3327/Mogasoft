import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive
  ],
  exports: [NavbarComponent]

})
export class NavbarModule { }
