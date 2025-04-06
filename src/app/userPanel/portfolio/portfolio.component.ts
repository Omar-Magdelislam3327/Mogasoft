import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LangTransService } from '../../core/services/lang-trans.service';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TranslateModule,
    CarouselModule,
    CommonModule
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  direction!: any;
  currentLang!: any;
  constructor(private router: Router, private lang: LangTransService, private meta: Meta) {
    window.scrollTo(0, 0);
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
    this.direction = this.lang.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  ngOnInit(): void {
    this.setMetaTags();
  }
  setMetaTags(): void {
    const allItems = [...this.softwareItems, ...this.hardwareItems];

    const englishKeywords = allItems.map(item => item.userTitleEN).join(', ');
    const arabicKeywords = allItems.map(item => item.userTitleAR).join(', ');

    this.meta.updateTag({
      name: 'description',
      content: 'Discover our professional services in web development, mobile applications, UI/UX design, and more.'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: `${englishKeywords}, ${arabicKeywords}`
    });
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
    { userTitleAR: "تطبيقات الموبايل", userTitleEN: "Mobile Development", title: 'MobileDevelopment', image: 'assets/vendors/imgs/services/mobile.webp' },
    { userTitleAR: "التوسيق الرقمي", userTitleEN: "Digital Marketing", title: 'DigitalMarketing', image: 'assets/vendors/imgs/services/digital.webp' },
  ];

  hardwareItems = [
    { userTitleAR: "الكمبيوترات", userTitleEN: "Computers", title: 'Computers', image: 'assets/vendors/imgs/services/computer.webp' },
    { userTitleAR: "أنظمة المراقبة", userTitleEN: "Surveliiance System", title: 'SurveillanceSystems', image: 'assets/vendors/imgs/services/camera.webp' },
    { userTitleAR: "ماكينات التصوير", userTitleEN: "Copiers", title: 'Copiers', image: 'assets/vendors/imgs/services/copier.webp' },
    { userTitleAR: "مكافحة الحرائق", userTitleEN: "Fire Fighting", title: 'FireFighting', image: 'assets/vendors/imgs/services/fire.webp' },
    { userTitleAR: "الشبكات", userTitleEN: "Network", title: 'Network', image: 'assets/vendors/imgs/services/network.webp' },
    { userTitleAR: "الإستدعاء الالي", userTitleEN: "Queue Management", title: 'QueueManagement', image: 'assets/vendors/imgs/services/queue.webp' },
  ];
  navigateToCategory(category: string) {
    this.router.navigate(['/projects', category]);
  }
}
