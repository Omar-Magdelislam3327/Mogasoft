import { PlansService } from './../../../core/services/plans.service';
import { Component } from '@angular/core';
import { LangTransService } from 'src/app/core/services/lang-trans.service';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.css']
})
export class HostingComponent {
  currentLang!: any;
  plans!: any;
  constructor(private lang: LangTransService, private plansService: PlansService) {
    window.scrollTo(0, 0);
    this.currentLang = localStorage.getItem('language') || 'en';
    this.lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    });
  }
  ngOnInit() {
    this.getAllPlans();
  }
  getAllPlans(): void {
    this.plansService.getPlans().subscribe(
      (data: any) => {
        this.plans = data.map((plan: any) => ({
          ...plan,
          hostingProperties: plan.hosting_Properties || []
        }));
        console.log('Mapped Plans:', this.plans);
      },
      (error) => {
        console.error('Error retrieving plans:', error);
      }
    );
  }
}
