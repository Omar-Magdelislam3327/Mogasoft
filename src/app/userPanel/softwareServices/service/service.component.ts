import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ServicesService } from '../../../core/services/services.service';
import { Meta } from '@angular/platform-browser';
import { LangTransService } from '../../../core/services/lang-trans.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TranslateModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ServiceComponent {
  @ViewChildren('stepCard', { read: ElementRef }) stepCards!: QueryList<ElementRef>;
  currentLang: string;
  category: any;
  serviceData!: any;
  steps: any[] = [];
  // 
  imageLoaded = false;
  observer!: IntersectionObserver;

  constructor(
    private translate : TranslateService,
    private lang: LangTransService,
    private serviceAPI: ServicesService,
    private activ: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private Meta: Meta,
    private title: Title,
  ) {
    window.scrollTo(0, 0);
    this.currentLang = localStorage.getItem('language') || 'en';
    this.translate.use(this.currentLang);
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
    this.activ.paramMap.subscribe(params => {
      this.category = params.get('category');
      console.log('Category:', this.category);

      if (this.category) {
        this.fetchService();
      }
    });

    this.Meta.addTags([
      {
        name: 'keywords',
        content: `
          Web Development, Website Design, Frontend Development, Backend Development, Full-Stack Development, Angular Development, React Development, Vue.js Development, Custom Web Applications,
          E-Commerce Solutions, Online Store Development, CMS Development, WordPress Development, Web Hosting, Cloud Hosting, Domain Registration, Server Management,
          Mobile App Development, Android App Development, iOS App Development, Cross-Platform Apps, Flutter Development, React Native Development, UI/UX Design, User Experience Optimization,
          Digital Marketing, SEO Services, Search Engine Optimization, Google Ads, PPC Advertising, Social Media Marketing, Facebook Ads, Instagram Ads, LinkedIn Ads, Content Marketing,
          Copywriting, Blogging, Email Marketing, Lead Generation, Conversion Rate Optimization, Brand Awareness, Online Reputation Management, Influencer Marketing,
          Hardware Solutions, IT Hardware, Copiers, Plotters, Printers, Printing Solutions, Surveillance Cameras, CCTV Cameras, Security Cameras, Video Surveillance,
          Access Control Systems, Biometrics, Office Security, Network Infrastructure, Networking Solutions, Routers, Switches, Firewalls, Cybersecurity Solutions,
          Firefighting Systems, Fire Alarms, Smoke Detectors, Emergency Systems, Queue Management Systems, Queue Solutions, Customer Service Technology, IT Support,
          Managed IT Services, Technical Support, IT Consulting, Business IT Solutions, Software Development, Enterprise Solutions, ERP Systems, CRM Software, Database Management,
          Data Security, Cloud Computing, Virtualization, Backup and Disaster Recovery, Cybersecurity, Penetration Testing, Security Audits, Wireless Networking, IoT Solutions,
          Smart Office Solutions, Business Automation, Workflow Automation, Smart Home Integration, Digital Transformation, AI-Powered Solutions, SaaS Solutions, Web App Security,
          DevOps Services, Agile Development, Software Maintenance, Website Optimization, Performance Tuning, Web Security, SSL Certificates, IT Consultancy, Data Analysis,
          Business Intelligence, Machine Learning Integration, Data-Driven Marketing, Advanced Analytics, AI Chatbots, Customer Relationship Management, User Engagement,
          Digital Strategy, Marketing Automation, Google My Business Optimization, Video Production, Graphic Design, Branding Services, Logo Design, UI Components, Interactive Web Design,
          Professional IT Services, Business Growth Strategies, Corporate IT Solutions, Startup IT Support, High-Performance Websites, Secure Applications, Data Privacy Compliance,

          تطوير الويب, تصميم المواقع, تطوير الواجهة الأمامية, تطوير الواجهة الخلفية, تطوير الويب المتكامل, تطوير أنجولار, تطوير رياكت, تطوير Vue.js, تطبيقات الويب المخصصة,
          حلول التجارة الإلكترونية, تطوير المتاجر الإلكترونية, تطوير أنظمة إدارة المحتوى, تطوير ووردبريس, استضافة الويب, الاستضافة السحابية, تسجيل النطاقات, إدارة الخوادم,
          تطوير تطبيقات الجوال, تطوير تطبيقات أندرويد, تطوير تطبيقات iOS, التطبيقات متعددة المنصات, تطوير فلاتر, تطوير React Native, تصميم UI/UX, تحسين تجربة المستخدم,
          التسويق الرقمي, خدمات السيو, تحسين محركات البحث, إعلانات جوجل, إعلانات الدفع لكل نقرة, التسويق عبر وسائل التواصل الاجتماعي, إعلانات فيسبوك, إعلانات إنستغرام, إعلانات لينكد إن, تسويق المحتوى,
          كتابة الإعلانات, التدوين, التسويق عبر البريد الإلكتروني, توليد العملاء المحتملين, تحسين معدل التحويل, بناء الوعي بالعلامة التجارية, إدارة السمعة الإلكترونية, التسويق عبر المؤثرين,
          حلول الأجهزة, الأجهزة التقنية, الطابعات, أجهزة التصوير, حلول الطباعة, كاميرات المراقبة, كاميرات CCTV, الكاميرات الأمنية, أنظمة المراقبة بالفيديو,
          أنظمة التحكم في الدخول, القياسات الحيوية, أمن المكاتب, البنية التحتية للشبكات, حلول الشبكات, أجهزة التوجيه, المحولات, الجدران النارية, حلول الأمن السيبراني,
          أنظمة مكافحة الحرائق, أجهزة إنذار الحريق, كاشفات الدخان, أنظمة الطوارئ, أنظمة إدارة الطوابير, حلول الطوابير, تقنية خدمة العملاء, دعم تكنولوجيا المعلومات,
          خدمات تكنولوجيا المعلومات المدارة, الدعم الفني, استشارات تقنية المعلومات, حلول تكنولوجيا المعلومات للأعمال, تطوير البرمجيات, الحلول المؤسسية, أنظمة ERP, برامج CRM, إدارة قواعد البيانات,
          أمن البيانات, الحوسبة السحابية, الافتراضية, النسخ الاحتياطي واستعادة البيانات, الأمن السيبراني, اختبارات الاختراق, تدقيق الأمان, الشبكات اللاسلكية, حلول إنترنت الأشياء,
          حلول المكاتب الذكية, أتمتة الأعمال, أتمتة سير العمل, تكامل المنازل الذكية, التحول الرقمي, حلول الذكاء الاصطناعي, حلول SaaS, أمان تطبيقات الويب,
          خدمات DevOps, تطوير Agile, صيانة البرمجيات, تحسين أداء المواقع, ضبط الأداء, أمان الويب, شهادات SSL, استشارات تكنولوجيا المعلومات, تحليل البيانات,
          ذكاء الأعمال, تكامل التعلم الآلي, التسويق القائم على البيانات, التحليلات المتقدمة, روبوتات المحادثة الذكية, إدارة علاقات العملاء, تفاعل المستخدمين,
          الاستراتيجية الرقمية, أتمتة التسويق, تحسين Google My Business, إنتاج الفيديو, التصميم الجرافيكي, خدمات العلامات التجارية, تصميم الشعارات, مكونات UI, تصميم الويب التفاعلي,
          خدمات تكنولوجيا المعلومات الاحترافية, استراتيجيات نمو الأعمال, حلول تكنولوجيا المعلومات للشركات, دعم الشركات الناشئة, مواقع الويب عالية الأداء, التطبيقات الآمنة, الامتثال لخصوصية البيانات.
        `
      }
    ]);


    this.title.setTitle(`Mogasoft | ${this.category}`);
  }
  
  ngAfterViewInit() {
    this.observeStepCards();

    this.stepCards.changes.subscribe(() => {
      this.observeStepCards();
    });
  }

  observeStepCards() {
    if (!this.stepCards || this.stepCards.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.classList.add('active');
          element.querySelector('.step-number')?.classList.add('active');
          element.querySelector('.step-card')?.classList.add('active');
        } else {
          element.classList.remove('active');
          element.querySelector('.step-number')?.classList.remove('active');
          element.querySelector('.step-card')?.classList.remove('active');
        }
      });
    }, observerOptions);

    this.stepCards.forEach((card) => observer.observe(card.nativeElement));
  }

  fetchService() {
    this.serviceAPI.getServiceByCategory(this.category).subscribe((res) => {
      if (res) {
        this.serviceData = res[0];
        this.steps = this.serviceData.serviceSteps || [];
        this.cdr.detectChanges();
      } else {
        console.error('No service found for this category');
      }
    });
  }
  // 
  onImageLoad() {
    console.log('Image loaded!');
    this.imageLoaded = true;  
  }

ngOnDestroy() {
  if (this.observer) {
    this.stepCards.forEach((card) => this.observer.unobserve(card.nativeElement));
  }
}

}
