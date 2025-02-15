import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent {
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
      titleEN: 'Site Assessment & Planning',
      titleAR: 'تقييم الموقع والتخطيط',
      descriptionEN: 'Our team evaluates your security needs, identifying optimal camera placements for maximum coverage.',
      descriptionAR: 'يقوم فريقنا بتقييم احتياجات الأمان لديك وتحديد المواقع المثلى للكاميرات لضمان تغطية قصوى.'
    },
    {
      titleEN: 'Installation & Configuration',
      titleAR: 'التركيب والتكوين',
      descriptionEN: 'We provide professional setup of high-resolution cameras with night vision, motion detection, and remote monitoring capabilities.',
      descriptionAR: 'نقدم تركيبًا احترافيًا لكاميرات عالية الدقة مع الرؤية الليلية، واكتشاف الحركة، وإمكانيات المراقبة عن بُعد.'
    },
    {
      titleEN: 'Maintenance & Monitoring',
      titleAR: 'الصيانة والمراقبة',
      descriptionEN: 'Ensure 24/7 security with routine maintenance, software updates, and real-time surveillance solutions.',
      descriptionAR: 'ضمان الأمان على مدار الساعة من خلال الصيانة الدورية، وتحديثات البرامج، وحلول المراقبة في الوقت الفعلي.'
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
