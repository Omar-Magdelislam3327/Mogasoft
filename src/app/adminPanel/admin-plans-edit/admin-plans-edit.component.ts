import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from 'src/app/core/services/plans.service';

@Component({
  selector: 'app-admin-plans-edit',
  templateUrl: './admin-plans-edit.component.html',
  styleUrls: ['./admin-plans-edit.component.css']
})
export class AdminPlansEditComponent {
  planForm!: FormGroup;
  plans!: any;
  planId: any;
  constructor(private fb: FormBuilder, private plansService: PlansService, private route: ActivatedRoute, private router: Router) {
    this.planId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.planForm = this.fb.group({
      NameEN: ['', Validators.required],
      NameAR: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      Url: ['', Validators.required],
      IsBest: [false, Validators.required],
      HostingProperties: this.fb.array([])
    });
    this.loadPlans();
  }

  loadPlans(): void {
    this.plansService.getPlans().subscribe((data: any) => {
      const planData = data.find((c: any) => c.id == this.planId);
      console.log('Plan:', planData);

      if (!planData || !planData.hosting_Properties) return;

      this.planForm.patchValue({
        NameEN: planData.nameEN,
        NameAR: planData.nameAR,
        Price: planData.price,
        Url: planData.url,
        IsBest: planData.isBest,
      });

      const planProperties = this.planForm.get('HostingProperties') as FormArray;
      planProperties.clear();
      planData.hosting_Properties.forEach((step: any) => {
        planProperties.push(this.fb.group({
          titleEN: step.titleEN,
          titleAR: step.titleAR
        }));
      });

      console.log('Updated Form:', this.planForm.value);
    });
  }


  get hostingProperties(): FormArray {
    return this.planForm.get('HostingProperties') as FormArray;
  }

  createProperty(step: any = { titleEN: '', titleAR: '' }): FormGroup {
    return this.fb.group({
      titleEN: [step.titleEN, Validators.required],
      titleAR: [step.titleAR, Validators.required]
    });
  }

  addProperty(): void {
    this.hostingProperties.push(this.createProperty());
  }

  removeProperty(index: number): void {
    if (this.hostingProperties.length > 1) {
      this.hostingProperties.removeAt(index);
    }
  }

  submitPlan(): void {
    if (this.planForm.invalid) return;

    console.log("Submitting Plan...");

    const formData = new FormData();
    formData.append('NameEN', this.planForm.value.NameEN);
    formData.append('NameAR', this.planForm.value.NameAR);
    formData.append('Price', this.planForm.value.Price.toString());
    formData.append('Url', this.planForm.value.Url);
    formData.append('IsBest', this.planForm.value.IsBest.toString());

    this.planForm.value.HostingProperties.forEach((property: any, index: number) => {
      formData.append(`HostingProperties[${index}][titleEN]`, property.titleEN);
      formData.append(`HostingProperties[${index}][titleAR]`, property.titleAR);
    });

    this.plansService.updatePlan(this.planId, formData).subscribe({
      next: (response) => {
        console.log('Plan updated successfully:', response);
        this.planForm.reset();
        this.router.navigate(['/admin/plans']);
      },
      error: (error) => {
        console.error('Error updating plan:', error);
      }
    });
  }

}
