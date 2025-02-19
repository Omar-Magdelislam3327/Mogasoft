import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  direction!: any;
  currentLang!: any;
  teamMembers!: any;
  constructor(private lang: LangTransService, private teamApi: TeamService) {
    window.scrollTo(0, 0);
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
    this.direction = this.lang.currentLang === 'ar' ? 'rtl' : 'ltr';
    this.getTeamMembers();
  }
  getTeamMembers() {
    this.teamApi.getTeam().subscribe((res: any) => {
      this.teamMembers = res;
      console.log(this.teamMembers);
    });
  }

  customOptions = {
    loop: true,
    margin: 20,
    dots: true,
    nav: false,
    rtl: this.lang.currentLang === 'ar',
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };

}
