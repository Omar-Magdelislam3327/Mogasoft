import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LangTransService } from 'src/app/core/services/lang-trans.service';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  @ViewChildren('stepCard', { read: ElementRef }) stepCards!: QueryList<ElementRef>;
  currentLang!: any;
  category!: any;
  serviceData!: any;
  steps: any[] = [];

  constructor(
    private lang: LangTransService,
    private serviceAPI: ServicesService,
    private activ: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private Meta: Meta,
    private title: Title
  ) {
    this.currentLang = localStorage.getItem('language') || 'en';
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
          Professional IT Services, Business Growth Strategies, Corporate IT Solutions, Startup IT Support, High-Performance Websites, Secure Applications, Data Privacy Compliance.
        `
      }
    ]);

    this.title.setTitle(`Mogasoft | ${this.category}`);
  }

  ngAfterViewInit() {
    this.observeStepCards();

    // Listen for changes in stepCards because QueryList updates dynamically
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
        console.log("Data", this.serviceData);
        console.log("Steps", this.steps);
        this.cdr.detectChanges();
      } else {
        console.error('No service found for this category');
      }
    });
  }

}
