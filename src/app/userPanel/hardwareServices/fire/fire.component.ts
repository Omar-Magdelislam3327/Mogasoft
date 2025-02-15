import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-fire',
  templateUrl: './fire.component.html',
  styleUrls: ['./fire.component.css']
})
export class FireComponent {
  @ViewChildren('stepCard', { read: ElementRef }) stepCards!: QueryList<ElementRef>;
  currentLang!: any;
  constructor(private lang: LangTransService) {
    this.currentLang = localStorage.getItem('language') || "en";
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
  }
  steps = [
    {
      titleEN: 'Risk Assessment & System Design',
      titleAR: 'تقييم المخاطر وتصميم النظام',
      descriptionEN: 'We conduct detailed evaluations and develop customized fire safety plans.',
      descriptionAR: 'نقوم بإجراء تقييمات تفصيلية وتطوير خطط مخصصة للسلامة من الحرائق.'
    },
    {
      titleEN: 'Installation & Integration',
      titleAR: 'التركيب والتكامل',
      descriptionEN: 'Our systems include fire alarms, smoke detectors, and suppression units, seamlessly integrated for maximum efficiency.',
      descriptionAR: 'تتضمن أنظمتنا أجهزة إنذار الحريق وكاشفات الدخان ووحدات الإخماد، مدمجة بسلاسة لتحقيق أقصى كفاءة.'
    },
    {
      titleEN: 'Testing & Compliance',
      titleAR: 'الاختبار والامتثال',
      descriptionEN: 'We ensure all fire safety systems meet strict industry regulations with routine inspections and testing.',
      descriptionAR: 'نضمن امتثال جميع أنظمة السلامة من الحرائق للوائح الصناعة الصارمة من خلال عمليات التفتيش والاختبار الدورية.'
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
