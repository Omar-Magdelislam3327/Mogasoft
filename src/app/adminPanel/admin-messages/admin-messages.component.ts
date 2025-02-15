import { Component } from '@angular/core';
import { MessagesService } from 'src/app/core/services/messages.service';
import { Messages } from 'src/app/models/messages';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent {
  messages!: Messages[];
  constructor(private messageService: MessagesService) { }
  ngOnInit(): void {
    this.getMessages();
  }
  getMessages(): void {
    this.messageService.getMessages().subscribe((data: any) => {
      this.messages = data;
      console.log(this.messages);

    })
  }
  remove(id: number): void {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.getMessages();
    })
  }
}
