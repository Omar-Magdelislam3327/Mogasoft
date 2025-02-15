import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
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
      titleEN: "Discovery & Strategy",
      descriptionEN:
        "Great websites start with a great plan. We analyze your business goals, target audience, and competitors to craft a strategic blueprint.",
      titleAR: "الاكتشاف والاستراتيجية",
      descriptionAR:
        "المواقع الرائعة تبدأ بخطة رائعة. نقوم بتحليل أهداف عملك، والجمهور المستهدف، والمنافسين لوضع مخطط استراتيجي.",
    },
    {
      titleEN: "Design & Development",
      descriptionEN:
        "A stunning design isn’t just about looks; it’s about user experience. Our team creates seamless, interactive designs that make navigation effortless and enjoyable.",
      titleAR: "التصميم والتطوير",
      descriptionAR:
        "التصميم المذهل لا يتعلق بالمظهر فقط؛ بل يتعلق بتجربة المستخدم. يقوم فريقنا بإنشاء تصاميم سلسة وتفاعلية تجعل التنقل سهلاً وممتعًا.",
    },
    {
      titleEN: "Testing & Deployment",
      descriptionEN:
        "We write clean, efficient, and scalable code to ensure your website functions flawlessly. Whether it’s a corporate site, an e-commerce platform, or a complex web app, we build it right.",
      titleAR: "الاختبار والنشر",
      descriptionAR:
        "نكتب كودًا نظيفًا وفعالًا وقابلًا للتطوير لضمان عمل موقعك بسلاسة. سواء كان موقعًا للشركات، أو منصة للتجارة الإلكترونية، أو تطبيق ويب معقد، فإننا نبنيه بالطريقة الصحيحة.",
    },
    {
      titleEN: "Ongoing Support",
      descriptionEN:
        "No glitches, no broken links, no slow loading times. Our QA experts rigorously test your site to ensure peak performance on all devices and browsers.",
      titleAR: "الدعم المستمر",
      descriptionAR:
        "لا أعطال، لا روابط مكسورة، لا أوقات تحميل بطيئة. يقوم خبراؤنا في ضمان الجودة باختبار موقعك بدقة لضمان أداء مثالي على جميع الأجهزة والمتصفحات.",
    },
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
