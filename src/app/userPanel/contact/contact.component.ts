
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

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
