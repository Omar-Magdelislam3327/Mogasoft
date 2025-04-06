import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../core/services/clients.service';

@Component({
  selector: 'app-admin-clients-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-clients-edit.component.html',
  styleUrl: './admin-clients-edit.component.css'
})
export class AdminClientsEditComponent {
  clientForm!: FormGroup;
  clientId!: any;
  //
  fileSize: number | null = null;
  fileTooLarge: boolean = false;
  invalidFileType: boolean = false;
  readonly maxFileSizeInMB: number = 50;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private clientAPI: ClientsService, private route: ActivatedRoute, private router: Router) {
    this.clientForm = this.fb.group({
      nameAR: ['', Validators.required],
      nameEN: ['', Validators.required],
      Logo: ['', Validators.required],
    });

    this.clientId = this.route.snapshot.paramMap.get('id');

    if (this.clientId) {
      this.loadClientData();
    }
  }

  loadClientData() {
    this.clientAPI.getClients().subscribe((clients: any[]) => {

      if (clients && clients.length > 0) {
        const clientData = clients.find((c: any) => c.id == this.clientId);
        console.log('Client:', clientData);

        if (clientData) {
          this.clientForm.patchValue({
            nameEN: clientData.nameEN,
            nameAR: clientData.nameAR,
          });
        }
      }
    });
  }

  update(): void {
    if (this.clientForm.invalid) {
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('Logo', this.selectedFile);
    } else {
      return;
    }

    formData.append('nameEN', this.clientForm.get('nameEN')?.value || '');
    formData.append('nameAR', this.clientForm.get('nameAR')?.value || '');
    if (this.invalidFileType || this.fileTooLarge) {
      return;
    }


    this.clientAPI.updateClient(this.clientId, formData).subscribe(
      (response) => {
        console.log(response);
        console.log(this.clientForm);
        this.router.navigate(['/admin/clients']);
      },
      (error) => {
        console.error(error);
        console.error(this.clientForm);
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
}
