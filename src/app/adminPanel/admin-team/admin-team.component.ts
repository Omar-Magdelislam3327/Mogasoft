import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '../../core/services/team.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-team.component.html',
  styleUrl: './admin-team.component.css'
})
export class AdminTeamComponent {
  teamForm: FormGroup;
  team!: any;
  fileSize: number | null = null;
  fileTooLarge = false;
  invalidFileType = false;
  readonly maxFileSizeInMB: number = 50;
  selectedFile: File | null = null;
  constructor(private api: TeamService, private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      FirstNameEN: ['', Validators.required],
      FirstNameAR: ['', Validators.required],
      LastNameEN: ['', Validators.required],
      LastNameAR: ['', Validators.required],
      PositionEN: ['', Validators.required],
      PositionAR: ['', Validators.required],
      Image: ['', Validators.required]
    })
    this.loadTeam();
  }
  loadTeam() {
    this.api.getTeam().subscribe({
      next: (data) => {
        this.team = data;
        console.log(data);

      },
      error: (error) => {
        console.log(error);
      },
    })
  }
  add(): void {
    if (this.teamForm.invalid) {
      console.log("Please enter");
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    } else {
      console.log("Please select");

      return;
    }

    formData.append('FirstNameEN', this.teamForm.get('FirstNameEN')?.value || '');
    formData.append('FirstNameAR', this.teamForm.get('FirstNameAR')?.value || '');
    formData.append('LastNameEN', this.teamForm.get('LastNameEN')?.value || '');
    formData.append('LastNameAR', this.teamForm.get('LastNameAR')?.value || '');
    formData.append('PositionEN', this.teamForm.get('PositionEN')?.value || '');
    formData.append('PositionAR', this.teamForm.get('PositionAR')?.value || '');

    if (this.invalidFileType || this.fileTooLarge) {
      console.log('Please select a valid image file (max size 50MB)');
      return;
    }


    this.api.addMember(formData).subscribe(
      (response) => {
        this.loadTeam();
        this.teamForm.reset();
        console.log(response);

      },
      (error) => {
        console.log(error);
        alert('Error sending team');
      }
    );
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    if (input?.files?.length) {
      const file = input.files[0];
      this.fileSize = file.size / (1024 * 1024);
      if (this.fileSize > this.maxFileSizeInMB) {
        this.fileTooLarge = true;
        this.invalidFileType = false;
        return;
      } else {
        this.fileTooLarge = false;
      }
      if (!file.type.startsWith('image/')) {
        this.invalidFileType = true;
        return;
      } else {
        this.invalidFileType = false;
      }
    }
  }
  deleteMember(id: number) {
    this.api.deleteMember(id).subscribe((data: any) => {
      this.loadTeam();
    })
  }
}
