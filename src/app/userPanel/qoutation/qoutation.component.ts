import { LangTransService } from './../../core/services/lang-trans.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { QuatationsService } from 'src/app/core/services/quatations.service';

@Component({
  selector: 'app-qoutation',
  templateUrl: './qoutation.component.html',
  styleUrls: ['./qoutation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class QoutationComponent {
  selectedCategory: string = 'software';
  servicesList: string[] = [];
  softwareServices = ['Web Developement', 'Mobile Development', 'Hosting', 'Digital Marketing'];
  hardwareServices = ['Computers', 'Surveillance Systems', 'Copiers & Plotters', 'Fire Fighting', 'Queue Management', 'Network'];
  qouteForm!: FormGroup;
  //
  currentLang!: any;
  constructor(private qouteService: QuatationsService, private fb: FormBuilder, private Lang: LangTransService, private sanitizer: DomSanitizer) {
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
