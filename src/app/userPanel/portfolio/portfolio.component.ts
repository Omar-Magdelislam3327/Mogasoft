import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  direction!: any;
  currentLang!: any;
  constructor(private router: Router, private lang: LangTransService) {
    window.scrollTo(0, 0);
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
    this.direction = this.lang.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  softwareOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };

  hardwareOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };

  softwareItems = [
    { userTitleAR: "تطبيقات الويب", userTitleEN: "Web Development", title: 'WebDevelopment', image: 'assets/vendors/imgs/services/web.png' },
    { userTitleAR: "تطبيقات الموبايل", userTitleEN: "Mobile Development", title: 'MobileDevelopment', image: 'assets/vendors/imgs/services/mobile.png' },
    { userTitleAR: "التوسيق الرقمي", userTitleEN: "Digital Marketing", title: 'DigitalMarketing', image: 'assets/vendors/imgs/services/digital.png' },
  ];

  hardwareItems = [
    { userTitleAR: "الكمبيوترات", userTitleEN: "Computers", title: 'Computers', image: 'assets/vendors/imgs/services/computer.png' },
    { userTitleAR: "أنظمة المراقبة", userTitleEN: "Surveliiance System", title: 'SurveillanceSystems', image: 'assets/vendors/imgs/services/camera.png' },
    { userTitleAR: "ماكينات التصوير", userTitleEN: "Copiers", title: 'Copiers', image: 'assets/vendors/imgs/services/copier.png' },
    { userTitleAR: "مكافحة الحرائق", userTitleEN: "Fire Fighting", title: 'FireFighting', image: 'assets/vendors/imgs/services/fire.png' },
    { userTitleAR: "الشبكات", userTitleEN: "Network", title: 'Network', image: 'assets/vendors/imgs/services/network.png' },
    { userTitleAR: "الإستدعاء الالي", userTitleEN: "Queue Management", title: 'QueueManagement', image: 'assets/vendors/imgs/services/queue.png' },
  ];

  navigateToCategory(category: string) {
    this.router.navigate(['/projects', category]);
  }
}
