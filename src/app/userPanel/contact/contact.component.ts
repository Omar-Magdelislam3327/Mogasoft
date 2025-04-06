import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesService } from '../../core/services/messages.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TranslateModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  messageForm!: FormGroup
  constructor(private messageService: MessagesService, private fb: FormBuilder, private sanitizer: DomSanitizer) {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.messageForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(11)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      findWay: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const formData = new FormData();
      formData.append('fullName', this.safeHTML(this.messageForm.value.fullName));
      formData.append('email', this.messageForm.value.email);
      formData.append('phone', this.messageForm.value.phone);
      formData.append('message', this.safeHTML(this.messageForm.value.message));
      formData.append('findWay', this.safeHTML(this.messageForm.value.findWay));

      this.messageService.sendMessage(formData).subscribe(() => {
        this.messageForm.reset();
      });
    } else {
      console.log('Form is invalid');
      console.log('Form:', this.messageForm.value);
    }
  }

  safeHTML(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }
}
