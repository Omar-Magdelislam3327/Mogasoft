import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { LangTransService } from '../../core/services/lang-trans.service';
import { QuotationsService } from '../../core/services/quotations.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-qoutation',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './qoutation.component.html',
  styleUrl: './qoutation.component.css'
})
export class QoutationComponent {
  selectedCategory: string = 'software';
  servicesList: string[] = [];
  softwareServices = ['Web Developement', 'Mobile Development', 'Hosting', 'Digital Marketing'];
  hardwareServices = ['Computers', 'Surveillance Systems', 'Copiers & Plotters', 'Fire Fighting', 'Queue Management', 'Network'];
  qouteForm!: FormGroup;
  //
  currentLang!: any;
  constructor(private qouteService: QuotationsService, private fb: FormBuilder, private Lang: LangTransService, private sanitizer: DomSanitizer) {
    window.scrollTo(0, 0);

    this.currentLang = localStorage.getItem('language') || 'en';
    this.Lang.currentLang.subscribe((lang: string) => {
      this.currentLang = lang;
    })
  }


  ngOnInit(): void {
    this.qouteForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      businessEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(11)]],
      companyName: ['', Validators.required],
      numberOfEmployees: ['', Validators.required],
      selectedCategory: [this.selectedCategory],
      service: ['', Validators.required],
      notes: ['', Validators.required]
    });
    this.updateServices();
  }

  updateServices(): void {
    const category = this.qouteForm.controls['selectedCategory'].value;
    this.servicesList = category === 'software' ? this.softwareServices : this.hardwareServices;
    this.qouteForm.controls['service'].setValue(this.servicesList[0]);
  }

  onCategoryChange(event: Event): void {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.updateServices();
  }


  onSubmit(): void {
    if (this.qouteForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.safeHTML(this.qouteForm.value.firstName));
      formData.append('lastName', this.safeHTML(this.qouteForm.value.lastName));
      formData.append('businessEmail', this.qouteForm.value.businessEmail);
      formData.append('phone', this.qouteForm.value.phone);
      formData.append('companyName', this.safeHTML(this.qouteForm.value.companyName));
      formData.append('numberOfEmployees', this.qouteForm.value.numberOfEmployees);
      formData.append('selectedCategory', this.qouteForm.value.selectedCategory);
      formData.append('service', this.qouteForm.value.service);
      formData.append('notes', this.safeHTML(this.qouteForm.value.notes));

      this.qouteService.postQuote(formData).subscribe(() => {
        console.log('Form submitted with:', formData);
        this.qouteForm.reset();
      });
    }
  }

  safeHTML(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }
}
