import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent {
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
      titleEN: 'Network Design & Implementation',
      titleAR: 'تصميم وتنفيذ الشبكات',
      descriptionEN: 'We develop and deploy robust, scalable networks for homes, offices, and large enterprises.',
      descriptionAR: 'نقوم بتطوير ونشر شبكات قوية وقابلة للتوسع للمنازل والمكاتب والمؤسسات الكبيرة.'
    },
    {
      titleEN: 'Security & Optimization',
      titleAR: 'الأمان والتحسين',
      descriptionEN: 'Implement firewalls, VPNs, and monitoring tools to protect data and enhance performance.',
      descriptionAR: 'نقوم بتنفيذ الجدران النارية، والشبكات الخاصة الافتراضية (VPN)، وأدوات المراقبة لحماية البيانات وتعزيز الأداء.'
    },
    {
      titleEN: 'Maintenance & Troubleshooting',
      titleAR: 'الصيانة واستكشاف الأخطاء',
      descriptionEN: 'Our dedicated support team ensures minimal downtime with proactive monitoring and fast issue resolution.',
      descriptionAR: 'يضمن فريق الدعم المتخصص لدينا الحد الأدنى من التوقف عن العمل من خلال المراقبة الاستباقية وحل المشكلات بسرعة.'
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
