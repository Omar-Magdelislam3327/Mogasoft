import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TeamService } from '../../core/services/team.service';
import { Team } from '../../core/models/team';
import { log } from 'console';
import { LangTransService } from '../../core/services/lang-trans.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TranslateModule,
    CommonModule,
    CarouselModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  teamMembers!: Team[];
  currentLang!: string;
  direction!: string;
  customOptions!:any;
  constructor(private translate : TranslateService , private teamApi : TeamService , private cdr : ChangeDetectorRef , private lang : LangTransService){
    window.scrollTo(0, 0);
    this.currentLang = localStorage.getItem('language') || 'en';
    this.translate.use(this.currentLang);
    // this.direction = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
      this.direction = this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
    });
  }
  ngOnInit(): void {
    this.getTeamMembers();
  }
  getTeamMembers() {
    this.teamApi.getTeam().subscribe({
      next:(res:Team[])=>{
        this.teamMembers = res;
        this.updateCarouselOptions();
        this.cdr.detectChanges();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  private updateCarouselOptions() {
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
  trackByMemberId(index: number, member: Team): number {
    return member.id;
  }
}
