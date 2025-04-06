import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Clients } from '../../core/models/clients';
import { ClientsService } from '../../core/services/clients.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-clients.component.html',
  styleUrl: './admin-clients.component.css'
})
export class AdminClientsComponent {
  clients!: Clients[];
  clientForm!: FormGroup
  constructor(private clientsService: ClientsService, private fb: FormBuilder) {
    this.getClinets();
  }
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      nameAR: ['', Validators.required],
      nameEN: ['', Validators.required],
      Logo: ['', Validators.required],
    });
  }
  getClinets() {
    this.clientsService.getClients().subscribe(data => {
      this.clients = data;
      console.log("Clients", this.clients);

    });
  }
  fileSize: number | null = null;
  fileTooLarge: boolean = false;
  invalidFileType: boolean = false;
  readonly maxFileSizeInMB: number = 50;
  selectedFile: File | null = null;
  add(): void {
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


    this.clientsService.addClient(formData).subscribe(
      (response) => {
        this.getClinets();
        console.log(response);
        console.log(this.clientForm);
        this.clientForm.reset();
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
  remove(clientId: number) {
    this.clientsService.deleteClient(clientId).subscribe(
      (response) => {
        this.getClinets();
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
