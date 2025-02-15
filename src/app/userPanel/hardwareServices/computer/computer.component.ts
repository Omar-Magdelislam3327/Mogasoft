import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent {
  @ViewChildren('stepCard', { read: ElementRef }) stepCards!: QueryList<ElementRef>;
  currentLang!: any;
  constructor(private lang: LangTransService) {
    this.currentLang = localStorage.getItem("language") || "en";
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
  }
  steps = [
    {
      titleEN: 'Consultation & Product Selection',
      titleAR: 'الاستشارة واختيار المنتجات',
      descriptionEN: 'Our experts analyze your specific needs to recommend the best desktops, laptops, and accessories, ensuring efficiency and long-term reliability.',
      descriptionAR: 'يحلل خبراؤنا احتياجاتك الخاصة لتقديم أفضل التوصيات لأجهزة الكمبيوتر المكتبية والمحمولة والملحقات، مما يضمن الكفاءة والموثوقية طويلة الأمد.'
    },
    {
      titleEN: 'Configuration & Setup',
      titleAR: 'الإعداد والتكوين',
      descriptionEN: 'We handle everything from system installation to software optimization, ensuring your devices are ready to perform at peak levels.',
      descriptionAR: 'نتولى كل شيء بدءًا من تثبيت النظام وحتى تحسين البرامج، لضمان أن أجهزتك جاهزة للأداء بأعلى مستوى.'
    },
    {
      titleEN: 'Maintenance & Support',
      titleAR: 'الصيانة والدعم',
      descriptionEN: 'Stay ahead with regular diagnostics, performance upgrades, and professional repair services to keep your systems running smoothly.',
      descriptionAR: 'ابقَ متقدماً من خلال التشخيصات المنتظمة، وترقيات الأداء، وخدمات الإصلاح الاحترافية للحفاظ على تشغيل أنظمتك بسلاسة.'
    }
  ];


  ngAfterViewInit() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.classList.add('active');
          element.querySelector('.step-number')?.classList.add('active');
          element.classList.add('active');
          element.querySelector('.step-card')?.classList.add('active');
        } else {
          element.classList.remove('active');
          element.querySelector('.step-number')?.classList.remove('active');
          element.classList.remove('active');
          element.querySelector('.step-card')?.classList.remove('active');
        }
      });
    }, observerOptions);

    this.stepCards.forEach((card) => observer.observe(card.nativeElement));
  }
}
