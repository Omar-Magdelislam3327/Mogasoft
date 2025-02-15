import { LangTransService } from 'src/app/core/services/lang-trans.service';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-copiers',
  templateUrl: './copiers.component.html',
  styleUrls: ['./copiers.component.css']
})
export class CopiersComponent {
  @ViewChildren('stepCard', { read: ElementRef }) stepCards!: QueryList<ElementRef>;
  currentLang!: any;
  constructor(private lang: LangTransService) {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
  }
  steps = [
    {
      titleEN: 'Product Consultation & Selection',
      titleAR: 'استشارة واختيار المنتج',
      descriptionEN: 'Get expert guidance on choosing high-performance copiers and plotters that match your business needs.',
      descriptionAR: 'احصل على إرشادات الخبراء لاختيار ماكينات التصوير والطابعات عالية الأداء التي تناسب احتياجات عملك.'
    },
    {
      titleEN: 'Installation & Training',
      titleAR: 'التثبيت والتدريب',
      descriptionEN: 'Our specialists ensure seamless integration into your workflow, offering hands-on training for smooth operation.',
      descriptionAR: 'يضمن متخصصونا تكاملاً سلسًا في سير عملك، مع تقديم تدريب عملي لضمان التشغيل السلس.'
    },
    {
      titleEN: 'Repair & Maintenance',
      titleAR: 'الإصلاح والصيانة',
      descriptionEN: 'Avoid downtime with regular servicing, firmware updates, and prompt technical support.',
      descriptionAR: 'تجنب التوقف عن العمل من خلال الصيانة الدورية، وتحديثات البرامج الثابتة، والدعم الفني السريع.'
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
