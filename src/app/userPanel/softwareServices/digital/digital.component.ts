import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-digital',
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.css']
})
export class DigitalComponent {
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
      titleEN: 'Market Research & Strategy',
      titleAR: 'أبحاث السوق والاستراتيجية',
      descriptionEN: 'Successful digital marketing starts with data. We analyze your industry, competitors, and target audience to create a results-driven marketing strategy tailored to your brand’s unique needs.',
      descriptionAR: 'يبدأ التسويق الرقمي الناجح بالبيانات. نقوم بتحليل مجالك ومنافسيك وجمهورك المستهدف لإنشاء استراتيجية تسويقية قائمة على النتائج ومصممة خصيصًا لاحتياجات علامتك التجارية.'
    },
    {
      titleEN: 'SEO & Content Optimization',
      titleAR: 'تحسين محركات البحث وتحسين المحتوى',
      descriptionEN: 'We optimize your website for search engines, ensuring it ranks higher in search results. Our content strategies include keyword-rich blog posts, landing pages, and multimedia content that engage and convert visitors.',
      descriptionAR: 'نحن نُحسن موقعك لمحركات البحث، مما يضمن ظهوره في نتائج البحث بشكل أفضل. تشمل استراتيجياتنا محتوى غني بالكلمات الرئيسية مثل المقالات وصفحات الهبوط والمحتوى المرئي لجذب الزوار وتحويلهم إلى عملاء.'
    },
    {
      titleEN: 'Social Media & Advertising',
      titleAR: 'وسائل التواصل الاجتماعي والإعلانات',
      descriptionEN: 'Our social media experts craft compelling campaigns across Facebook, Instagram, LinkedIn, and more. We leverage paid advertising and organic growth strategies to expand your reach and increase brand visibility.',
      descriptionAR: 'يُنشئ خبراؤنا حملات تسويقية جذابة عبر فيسبوك وإنستجرام ولينكد إن وغيرها. نحن نستخدم الإعلانات المدفوعة واستراتيجيات النمو العضوي لتوسيع نطاق وصولك وزيادة وضوح علامتك التجارية.'
    },
    {
      titleEN: 'Performance Analytics & Continuous Improvement',
      titleAR: 'تحليلات الأداء والتحسين المستمر',
      descriptionEN: 'Marketing success is measured by data. We track key performance indicators (KPIs), analyze user engagement, and refine our strategies to maximize ROI and long-term success.',
      descriptionAR: 'يتم قياس نجاح التسويق من خلال البيانات. نحن نتتبع مؤشرات الأداء الرئيسية (KPIs) ونحلل تفاعل المستخدمين ونُحسن استراتيجياتنا لتحقيق أقصى عائد على الاستثمار وضمان النجاح على المدى الطويل.'
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
