import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  direction!: string;
  currentLang!: string;
  teamMembers: any[] = [];
  customOptions: any = {};

  constructor(
    private lang: LangTransService,
    private teamApi: TeamService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    window.scrollTo(0, 0);
    this.currentLang = localStorage.getItem('language') || 'en';
    this.direction = this.currentLang === 'ar' ? 'rtl' : 'ltr';

    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
      this.direction = lang === 'ar' ? 'rtl' : 'ltr';
      this.updateCarouselOptions();
      this.cdr.detectChanges();
    });

    this.getTeamMembers();
  }

  getTeamMembers() {
    this.teamApi.getTeam().subscribe((res: any) => {
      this.teamMembers = res;

      this.cdr.detectChanges();
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.updateCarouselOptions();
          this.cdr.detectChanges();
        }, 100);
      });
    });
  }

  updateCarouselOptions() {
    this.customOptions = {
      loop: true,
      autoplay: true,
      autoplayTimeout: 2200,
      autoplaySpeed: 600,
      autoplayHoverPause: true,
      dotsSpeed: 400,
      lazyLoad: true,
      center: true,
      mergeFit: true,
      responsiveRefreshRate: 200,
      margin: 20,
      dots: true,
      nav: false,
      rtl: this.direction === 'rtl',
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    };
  }
}
