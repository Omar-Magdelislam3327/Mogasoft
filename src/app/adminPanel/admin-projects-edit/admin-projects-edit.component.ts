import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';

@Component({
  selector: 'app-admin-projects-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './admin-projects-edit.component.html',
  styleUrl: './admin-projects-edit.component.css'
})
export class AdminProjectsEditComponent {
  projectForm!: FormGroup;
  headImage!: File | null;
  selectedMediaFiles: File[] = [];
  projectId!: any;
  constructor(private fb: FormBuilder, private projectAPI: ProjectsService, private route: ActivatedRoute, private router: Router) {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.loadProjectData(this.projectId);
    }
  }
  ngOnInit(): void {
    this.projectForm = this.fb.group({
      NameAR: ['', Validators.required],
      NameEN: ['', Validators.required],
      DescriptionAR: ['', Validators.required],
      DescriptionEN: ['', Validators.required],
      Category: ['', Validators.required],
      Type: ['', Validators.required],
      HeadImage: ['', Validators.required],
      MediaFiles: ['', Validators.required],
      ProjectSteps: this.fb.array([this.createStep()])
    });
  }

  get projectSteps(): FormArray {
    return this.projectForm.get('ProjectSteps') as FormArray;
  }

  createStep(): FormGroup {
    return this.fb.group({
      titleEN: ['', Validators.required],
      titleAR: ['', Validators.required],
      descriptionEN: ['', Validators.required],
      descriptionAR: ['', Validators.required]
    });
  }

  addStep() {
    this.projectSteps.push(this.createStep());
  }

  removeStep(i: number) {
    if (this.projectSteps.length > 1) {
      this.projectSteps.removeAt(i);
    }
  }

  loadProjectData(projectId: number): void {
    this.projectAPI.getProjectById(projectId).subscribe((project: any) => {
      console.log('project:', project);

      this.projectForm.patchValue({
        NameAR: project.titleAR,
        NameEN: project.titleEN,
        DescriptionAR: project.descriptionAR,
        DescriptionEN: project.descriptionEN,
        Category: project.category,
        Type: project.type
      });

      const projectStepsArray = this.projectForm.get('ProjectSteps') as FormArray;
      projectStepsArray.clear();
      project.projectSteps.forEach((step: any) => {
        projectStepsArray.push(this.fb.group({
          titleEN: step.titleEN,
          titleAR: step.titleAR,
          descriptionEN: step.descriptionEN,
          descriptionAR: step.descriptionAR
        }));
      });
    });
  }

  onHeadImageSelected(event: any) {
    this.headImage = event.target.files[0] || null;
  }

  onMediaFilesSelected(event: any) {
    this.selectedMediaFiles = Array.from(event.target.files);
  }

  submitProject() {
    if (this.projectForm.invalid) {
      return;
    };
    console.log("Submitting Project");

    const formData = new FormData();
    formData.append('NameAR', this.projectForm.value.NameAR);
    formData.append('NameEN', this.projectForm.value.NameEN);
    formData.append('DescriptionAR', this.projectForm.value.DescriptionAR);
    formData.append('DescriptionEN', this.projectForm.value.DescriptionEN);
    formData.append('Category', this.projectForm.value.Category);
    formData.append('Type', this.projectForm.value.Type);

    if (this.headImage) {
      formData.append('HeadImage', this.headImage);
    }

    this.selectedMediaFiles.forEach((file, index) => {
      formData.append(`MediaFiles`, file);
    });

    this.projectForm.value.ProjectSteps.forEach((step: any, index: number) => {
      formData.append(`ProjectSteps[${index}][titleEN]`, step.titleEN);
      formData.append(`ProjectSteps[${index}][titleAR]`, step.titleAR);
      formData.append(`ProjectSteps[${index}][descriptionEN]`, step.descriptionEN);
      formData.append(`ProjectSteps[${index}][descriptionAR]`, step.descriptionAR);
    });

    this.projectAPI.updateProject(this.projectId, formData).subscribe({
      next: (response) => {
        console.log('Project Updated successfully!', response);
        this.projectForm.reset();
        this.router.navigate(['/admin/projects']);
      },
      error: (err) => {
        console.error('Error updaing project:', err);
      },
    });
  }
}
