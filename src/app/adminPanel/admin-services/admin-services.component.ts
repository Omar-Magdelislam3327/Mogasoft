import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent {
  serviceForm!: FormGroup;
  headImage!: File | null;
  constructor(private fb: FormBuilder, private serviceAPI: ServicesService) { }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      Type: ['Software', Validators.required],
      TitleEN: ['', Validators.required],
      TitleAR: ['', Validators.required],
      BioAR: ['', Validators.required],
      BioEN: ['', Validators.required],
      DescriptionAR: ['', Validators.required],
      DescriptionEN: ['', Validators.required],
      Image: [null, Validators.required],
      ServiceSteps: this.fb.array([this.createStep()])
    });
  }

  createStep(): FormGroup {
    return this.fb.group({
      titleEN: ['', Validators.required],
      titleAR: ['', Validators.required],
      descriptionEN: ['', Validators.required],
      descriptionAR: ['', Validators.required],
      bioEN: ['', Validators.required],
      bioAR: ['', Validators.required],
      image: [null, Validators.required]
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

  onStepImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const serviceStepsArray = this.serviceForm.get("ServiceSteps") as FormArray;
      serviceStepsArray.at(index).patchValue({ image: file });
      event.target.value = "";
    }
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

      if (step.image) {
        formData.append(`ServiceSteps[${index}][Image]`, step.image);
      }
    });

    this.serviceAPI.addService(formData).subscribe({
      next: (response) => {
        console.log('Service added successfully!', response);
        this.serviceForm.reset();
      },
      error: (err) => {
        console.error('Error adding service:', err);
      },
    });
  }

}
