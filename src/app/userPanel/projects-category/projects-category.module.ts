import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsCategoryRoutingModule } from './projects-category-routing.module';
import { ProjectsCategoryComponent } from './projects-category.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    ProjectsCategoryComponent
  ],
  imports: [
    CommonModule,
    ProjectsCategoryRoutingModule,
    NavbarModule,
    FooterModule,
    TranslateModule,
    RouterLink
  ]
})
export class ProjectsCategoryModule { }
