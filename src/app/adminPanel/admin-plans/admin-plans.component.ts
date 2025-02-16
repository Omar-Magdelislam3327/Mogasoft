import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PlansService } from 'src/app/core/services/plans.service';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.css']
})
export class AdminPlansComponent {
  planForm!: FormGroup;
  plans!: any;

  constructor(private fb: FormBuilder, private plansService: PlansService) { }

  ngOnInit(): void {
    this.getAllPlans();
    this.planForm = this.fb.group({
      NameEN: ['', Validators.required],
      NameAR: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      HostingProperties: this.fb.array([])
    });
  }

  get hostingProperties(): FormArray {
    return this.planForm.get('HostingProperties') as FormArray;
  }

  addProperty(): void {
    const propertyGroup = this.fb.group({
      titleEN: ['', Validators.required],
      titleAR: ['', Validators.required]
    });
    this.hostingProperties.push(propertyGroup);
  }

  removeProperty(index: number): void {
    this.hostingProperties.removeAt(index);
  }

  submitPlan(): void {
    if (this.planForm.invalid) return;

    const formData = new FormData();
    formData.append('NameEN', this.planForm.value.NameEN);
    formData.append('NameAR', this.planForm.value.NameAR);
    formData.append('Price', this.planForm.value.Price.toString());

    this.planForm.value.HostingProperties.forEach((property: any, index: number) => {
      formData.append(`HostingProperties[${index}].titleEN`, property.titleEN);
      formData.append(`HostingProperties[${index}].titleAR`, property.titleAR);
    });

    this.plansService.addPlan(formData).subscribe(
      (response) => {
        console.log('Plan added successfully:', response);
        this.getAllPlans();
        this.planForm.reset();
        this.hostingProperties.clear();
      },
      (error) => {
        console.error('Error adding plan:', error);
        console.error(this.planForm.value);
        console.error(this.hostingProperties.value);
      }
    );
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

  deletePlan(id: number): void {
    this.plansService.deletePlan(id).subscribe(
      (response) => {
        console.log('Plan deleted successfully:', response);
        this.getAllPlans();
      },
      (error) => {
        console.error('Error deleting plan:', error);
      }
    );
  }
}
