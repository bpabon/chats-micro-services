import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashbSoard',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 contacts = [
    { name: 'Alice', lastMessage: 'Hola!', id: 1 },
    { name: 'Bob', lastMessage: 'Nos vemos!', id: 2 },
    { name: 'Charlie', lastMessage: '¿Todo bien?', id: 3 },
  ];
  selectedContact = this.contacts[0];
  messages: { from: string; text: string }[] = [
    { from: 'Alice', text: 'Hola! ¿cómo estás?' },
    { from: 'yo', text: 'Todo bien, gracias. ¿Y tú?' },
  ];
  newMessage = '';

  selectContact(contact: any) {
    this.selectedContact = contact;
    this.messages = [
      { from: contact.name, text: 'Hola! Soy ' + contact.name },
      { from: 'yo', text: 'Hola! ¿Qué tal?' },
    ];
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ from: 'yo', text: this.newMessage });
      this.newMessage = '';
    }
  }
}
