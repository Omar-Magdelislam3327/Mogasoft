import { ChangeDetectorRef, Component } from '@angular/core';
import { LangTransService } from '../../../core/services/lang-trans.service';
import { PlansService } from '../../../core/services/plans.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-hosting',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './hosting.component.html',
  styleUrl: './hosting.component.css'
})
export class HostingComponent {
  currentLang!: any;
  plans!: any;
  constructor(private lang: LangTransService, private plansService: PlansService, private cdr: ChangeDetectorRef) {
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
        this.plans = data
          .map((plan: any) => {
            const afterDiscount = Math.round(plan.price + (plan.price * 0.35));
            return {
              ...plan,
              hostingProperties: plan.hosting_Properties || [],
              afterDiscount: afterDiscount
            };
          })
          .sort((a: any, b: any) => a.price - b.price);
  
        console.log('Mapped and Sorted Plans:', this.plans);
      },
      (error) => {
        console.error('Error retrieving plans:', error);
      }
    );
  }
}
