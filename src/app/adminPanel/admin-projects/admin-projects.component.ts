import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../core/services/projects.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.css'
})
export class AdminProjectsComponent {
  projectForm!: FormGroup;
  headImage!: File | null;
  selectedMediaFiles: File[] = [];
  projects!: any;

  constructor(private fb: FormBuilder, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getProjects();
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

    this.projectsService.addProject(formData).subscribe({
      next: (response) => {
        console.log('Project added successfully!', response);
        this.getProjects();
        this.projectForm.reset();
      },
      error: (err) => {
        console.error('Error adding project:', err);
      },
    });
  }

  getProjects() {
    this.projectsService.getProjects().subscribe({
      next: (data: any) => {
        this.projects = data;
        console.log('Projects:', this.projects);
      },
      error: (error) => {
        console.error('Error retrieving projects', error);
      }
    });
  }

  deleteProject(id: number) {
    this.projectsService.deleteProject(id).subscribe({
      next: (data) => {
        this.getProjects();
      }
    });
  }
}
