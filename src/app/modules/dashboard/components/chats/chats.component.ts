import { Component } from '@angular/core';
import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-chats',
  imports: [ContactsComponent, MessagesComponent],
  standalone: true,
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {

}
