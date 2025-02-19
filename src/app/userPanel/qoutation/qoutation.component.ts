import { LangTransService } from './../../core/services/lang-trans.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { QuatationsService } from 'src/app/core/services/quatations.service';

@Component({
  selector: 'app-qoutation',
  templateUrl: './qoutation.component.html',
  styleUrls: ['./qoutation.component.css']
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
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,14}$/)]],
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
      const formData = { ...this.qouteForm.value };
      formData.notes = this.safeHTML(formData.notes);
      this.qouteService.postQuote(this.qouteForm.value).subscribe(() => {
        console.log('Form submitted with:', this.qouteForm.value);
        this.qouteForm.reset();
      });
    }
  }
  safeHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
