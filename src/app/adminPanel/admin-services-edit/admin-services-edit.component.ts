import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-services-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-services-edit.component.html',
  styleUrl: './admin-services-edit.component.css'
})
export class AdminServicesEditComponent {
  serviceForm!: FormGroup;
  serviceId: any;
  headImage!: any;
  constructor(private fb: FormBuilder, private serviceAPI: ServicesService, private route: ActivatedRoute, private router: Router) {
    this.serviceId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      Type: ['Software', Validators.required],
      TitleEN: ['', Validators.required],
      TitleAR: ['', Validators.required],
      BioAR: ['', Validators.required],
      BioEN: ['', Validators.required],
      DescriptionAR: ['', Validators.required],
      DescriptionEN: ['', Validators.required],
      Category: ['', Validators.required],
      Image: [null, Validators.required],
      ServiceSteps: this.fb.array([this.createStep()])
    });
    this.loadServiceData();
  }

  createStep(): FormGroup {
    return this.fb.group({
      titleEN: ['', Validators.required],
      titleAR: ['', Validators.required],
      descriptionEN: ['', Validators.required],
      descriptionAR: ['', Validators.required],
      bioEN: ['', Validators.required],
      bioAR: ['', Validators.required],
    });
  }

  get ServiceSteps(): FormArray {
    return this.serviceForm.get('ServiceSteps') as FormArray;
  }

  addStep(): void {
    this.ServiceSteps.push(this.createStep());
  }

  removeStep(index: number): void {
    if (this.ServiceSteps.length > 1) {
      this.ServiceSteps.removeAt(index);
    }
  }

  onHeadImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.headImage = file;
      event.target.value = '';
    }
  }
  loadServiceData() {
    this.serviceAPI.getServices().subscribe((services: any) => {
      console.log(services);
      const service = services.find((s: any) => s.id == this.serviceId);
      console.log(service);

      if (service) {
        this.serviceForm.patchValue({
          Type: service.type,
          TitleEN: service.titleEN,
          TitleAR: service.titleAR,
          BioEN: service.bioEN,
          BioAR: service.bioAR,
          DescriptionEN: service.descriptionEN,
          DescriptionAR: service.descriptionAR,
          Category: service.category,
        });
        this.ServiceSteps.clear();
        service.serviceSteps.forEach((step: any) => {
          this.ServiceSteps.push(this.fb.group({
            titleEN: [step.titleEN, Validators.required],
            titleAR: [step.titleAR, Validators.required],
            descriptionEN: [step.descriptionEN, Validators.required],
            descriptionAR: [step.descriptionAR, Validators.required],
            bioEN: [step.bioEN, Validators.required],
            bioAR: [step.bioAR, Validators.required],
          }));
        });
      }
    });
  }

  onSubmit(): void {
    if (this.serviceForm.invalid) {
      return;
    }
    console.log("Submitting Service");

    const formData = new FormData();
    Object.keys(this.serviceForm.value).forEach((key) => {
      if (key !== "ServiceSteps") {
        formData.append(key, this.serviceForm.value[key]);
      }
    });
    formData.append('Type', this.serviceForm.value.Type);
    formData.append('TitleEN', this.serviceForm.value.TitleEN);
    formData.append('TitleAR', this.serviceForm.value.TitleAR);
    formData.append('BioEN', this.serviceForm.value.BioEN);
    formData.append('BioAR', this.serviceForm.value.BioAR);
    formData.append('DescriptionEN', this.serviceForm.value.DescriptionEN);
    formData.append('DescriptionAR', this.serviceForm.value.DescriptionAR);

    if (this.headImage) {
      formData.append('Image', this.headImage);
    }

    this.serviceForm.value.ServiceSteps.forEach((step: any, index: number) => {
      formData.append(`ServiceSteps[${index}][titleEN]`, step.titleEN);
      formData.append(`ServiceSteps[${index}][titleAR]`, step.titleAR);
      formData.append(`ServiceSteps[${index}][bioEN]`, step.bioEN);
      formData.append(`ServiceSteps[${index}][bioAR]`, step.bioAR);
      formData.append(`ServiceSteps[${index}][descriptionEN]`, step.descriptionEN);
      formData.append(`ServiceSteps[${index}][descriptionAR]`, step.descriptionAR);
    });

    this.serviceAPI.updateService(this.serviceId, formData).subscribe({
      next: (response) => {
        console.log('Service added successfully!', response);
        this.router.navigate(['/admin/services']);
        this.serviceForm.reset();
      },
      error: (err) => {
        console.error('Error adding service:', err);
      },
    });
  }
}
