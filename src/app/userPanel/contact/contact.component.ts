import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  messageForm!: FormGroup
  constructor(private messageService: MessagesService, private fb: FormBuilder) { }
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
      this.messageService.sendMessage(this.messageForm.value).subscribe(
        () => {
          this.messageForm.reset();
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
