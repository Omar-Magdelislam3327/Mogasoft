import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from '../../core/services/plans.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-plans-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './admin-plans-edit.component.html',
  styleUrl: './admin-plans-edit.component.css'
})
export class AdminPlansEditComponent {
  planForm!: FormGroup;
  plans!: any;
  planId: any;
  
  constructor(private fb: FormBuilder, private plansService: PlansService, private route: ActivatedRoute, private router: Router) {
    this.planId = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.initForm();
    this.loadPlans();
  }
  
  initForm(): void {
    this.planForm = this.fb.group({
      NameEN: ['', Validators.required],
      NameAR: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      Url: ['', Validators.required],
      IsBest: [false, Validators.required],
      HostingProperties: this.fb.array([])
    });
  }
  
  loadPlans(): void {
    this.plansService.getPlans().subscribe((data: any) => {
      const planData = data.find((c: any) => c.id == this.planId);
      console.log('Plan:', planData);
      
      if (!planData) return;
      
      this.planForm.patchValue({
        NameEN: planData.nameEN,
        NameAR: planData.nameAR,
        Price: planData.price,
        Url: planData.url,
        IsBest: planData.isBest,
      });
      
      const hostingPropertiesArray = this.planForm.get('HostingProperties') as FormArray;
      hostingPropertiesArray.clear();
      
      if (planData.hosting_Properties && planData.hosting_Properties.length > 0) {
        planData.hosting_Properties.forEach((property: any) => {
          hostingPropertiesArray.push(
            this.fb.group({
              titleEN: [property.titleEN, Validators.required],
              titleAR: [property.titleAR, Validators.required]
            })
          );
        });
      } else {
        this.addProperty();
      }
      
      console.log('Updated Form:', this.planForm.value);
    });
  }
  
  get hostingProperties(): FormArray {
    return this.planForm.get('HostingProperties') as FormArray;
  }
  
  createProperty(property: any = { titleEN: '', titleAR: '' }): FormGroup {
    return this.fb.group({
      titleEN: [property.titleEN, Validators.required],
      titleAR: [property.titleAR, Validators.required]
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
    if (this.planForm.invalid) {
      console.log('Form is invalid:', this.planForm.errors);
      return;
    }
    
    const formData = new FormData();
    formData.append('NameEN', this.planForm.value.NameEN);
    formData.append('NameAR', this.planForm.value.NameAR);
    formData.append('Price', this.planForm.value.Price.toString());
    formData.append('Url', this.planForm.value.Url);
    formData.append('IsBest', this.planForm.value.IsBest.toString());
    
    const currentProperties = this.planForm.value.HostingProperties;
    currentProperties.forEach((property: any, index: number) => {
      formData.append(`HostingProperties[${index}][titleEN]`, property.titleEN);
      formData.append(`HostingProperties[${index}][titleAR]`, property.titleAR);
    });
    
    this.plansService.deletePlan(this.planId).subscribe({
      next: () => {
        formData.append('id', this.planId);
        
        this.plansService.addPlan(formData).subscribe({
          next: (response) => {
            console.log('Plan recreated successfully:', response);
            this.router.navigate(['/admin/plans']);
          },
          error: (error) => {
            console.error('Error creating plan:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error deleting plan:', error);
      }
    });
  }
}