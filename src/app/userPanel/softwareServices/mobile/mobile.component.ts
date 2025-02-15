import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent {
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
      titleEN: "Concept & Planning",
      descriptionEN:
        "A great app starts with a solid foundation. We work closely with you to understand your app’s purpose, target users, and key functionalities. Our team outlines a comprehensive development roadmap, ensuring clarity and alignment with your business objectives.",
      titleAR: "المفهوم والتخطيط",
      descriptionAR:
        "يبدأ التطبيق الرائع بأساس متين. نعمل عن كثب معك لفهم هدف تطبيقك، والجمهور المستهدف، والوظائف الرئيسية. يحدد فريقنا خارطة طريق تطوير شاملة لضمان الوضوح والتوافق مع أهداف عملك.",
    },
    {
      titleEN: "UI/UX Design",
      descriptionEN:
        "User experience is everything. We design interactive prototypes that showcase the app’s layout, navigation, and key features. Our UI/UX experts focus on creating intuitive interfaces that enhance user engagement and satisfaction.",
      titleAR: "تصميم واجهة المستخدم وتجربة المستخدم",
      descriptionAR:
        "تجربة المستخدم هي كل شيء. نقوم بتصميم نماذج تفاعلية تعرض تخطيط التطبيق، والتنقل، والميزات الرئيسية. يركز خبراؤنا في UI/UX على إنشاء واجهات بديهية تعزز تفاعل المستخدم ورضاه.",
    },
    {
      titleEN: "Development",
      descriptionEN:
        "Using cutting-edge frameworks like Flutter, React Native, or native Android/iOS development, we bring your app to life. We prioritize clean, optimized code, ensuring fast performance, smooth animations, and secure data handling.",
      titleAR: "التطوير",
      descriptionAR:
        "باستخدام أحدث الأطر مثل Flutter و React Native أو تطوير أندرويد/iOS الأصلي، نقوم بإحياء تطبيقك. نركز على كتابة كود نظيف ومحسّن لضمان أداء سريع، ورسوم متحركة سلسة، ومعالجة بيانات آمنة.",
    },
    {
      titleEN: "Testing & Optimization",
      descriptionEN:
        "Every app goes through a rigorous testing process to ensure it’s bug-free and performs flawlessly on different devices. We conduct functionality, usability, and security tests to guarantee a seamless user experience.",
      titleAR: "الاختبار والتحسين",
      descriptionAR:
        "يمر كل تطبيق بعملية اختبار صارمة لضمان خلوه من الأخطاء وأدائه السلس على مختلف الأجهزة. نقوم بإجراء اختبارات على الوظائف، وسهولة الاستخدام، والأمان لضمان تجربة مستخدم سلسة.",
    },
    {
      titleEN: "Launch & Support",
      descriptionEN:
        "We handle the complete deployment process, from app store submission to backend server setup. Our team provides continuous monitoring, updates, and feature enhancements to keep your app running smoothly and efficiently.",
      titleAR: "الإطلاق والدعم",
      descriptionAR:
        "نتولى عملية النشر الكاملة، من تقديم التطبيق إلى متجر التطبيقات إلى إعداد الخادم الخلفي. يوفر فريقنا مراقبة مستمرة، وتحديثات، وتحسينات للميزات لضمان تشغيل تطبيقك بسلاسة وكفاءة.",
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
