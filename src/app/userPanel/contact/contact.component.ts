import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  messageForm!: FormGroup
  constructor(private messageService: MessagesService, private fb: FormBuilder, private sanitizer: DomSanitizer) {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.messageForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],
      findWay: ['', Validators.required]
    })
  }
  onSubmit() {
    if (this.messageForm.valid) {
      const formData = { ...this.messageForm.value };
      formData.notes = this.safeHTML(formData.notes);
      this.messageService.sendMessage(this.messageForm.value).subscribe(
        () => {
          this.messageForm.reset();
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  safeHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
