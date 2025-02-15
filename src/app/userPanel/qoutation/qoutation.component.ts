import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuatationsService } from 'src/app/core/services/quatations.service';

@Component({
  selector: 'app-qoutation',
  templateUrl: './qoutation.component.html',
  styleUrls: ['./qoutation.component.css']
})
export class QoutationComponent {
  selectedCategory: string = 'software';
  servicesList: string[] = [];
  softwareServices = ['Web', 'Mobile', 'Security', 'Hosting', 'Network'];
  hardwareServices = ['Cameras', 'Plotter', 'Fire Alarms'];

  qouteForm!: FormGroup;

  constructor(private qouteService: QuatationsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.qouteForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      businessEmail: ['', Validators.required, Validators.email],
      phone: ['', Validators.required],
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
      this.qouteService.postQuote(this.qouteForm.value).subscribe(() => {
        console.log('Form submitted with:', this.qouteForm.value);
        this.qouteForm.reset();
      });
    }
  }
}
