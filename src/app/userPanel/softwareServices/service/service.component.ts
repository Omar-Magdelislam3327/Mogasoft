import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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

  constructor(private lang: LangTransService, private serviceAPI: ServicesService, private activ: ActivatedRoute) {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
    this.activ.paramMap.subscribe(params => {
      this.category = params.get('category');
      if (this.category) {
        this.fetchService();
      }
    });
  }

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
  fetchService() {
    this.serviceAPI.getServiceByCategory(this.category).subscribe((res) => {
      this.serviceData = res;
      this.steps = this.serviceData.serviceSteps;
      console.log(res);
    });
  }
}
