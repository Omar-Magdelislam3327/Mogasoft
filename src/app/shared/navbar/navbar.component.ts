import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentLanguage!: string;

  constructor(
    private lang: LangTransService,
    private tranService: TranslateService
  ) { }

  ngOnInit(): void {
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLanguage = lang;
      this.tranService.use(lang);
    });
  }

  switchLanguage(lang: string): void {
    this.lang.setLanguage(lang);
  }
  ngAfterViewInit() {
    const subMenuToggles = document.querySelectorAll('.sub-menu-toggle');

    subMenuToggles.forEach(toggle => {
      toggle.addEventListener('hover', (event) => {
        event.preventDefault();
        event.stopPropagation();

        let nextElement = toggle.nextElementSibling as HTMLElement;

        if (nextElement) {
          nextElement.style.display = nextElement.style.display === 'block' ? 'none' : 'block';
        }
      });
    });
  }
}
