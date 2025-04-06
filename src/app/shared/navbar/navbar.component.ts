import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangTransService } from '../../core/services/lang-trans.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentLanguage = 'en';
  constructor(private translate: TranslateService , private lang : LangTransService) {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translate.use(this.currentLanguage);
  }

  switchLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translate.use(lang);
    this.lang.setLanguage(lang);
    localStorage.setItem('language', lang);
  }
}
