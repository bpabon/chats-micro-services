import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatsInterface, ClientChatsInterface } from '../../models/chats.interface';
import { WebsocketService } from '../../../../shared/services/realtime/websocket.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chats',
  imports: [AngularSvgIconModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit, AfterViewChecked, OnDestroy {
  chatSub!: Subscription;
  userLogin: any = {
    type: "join",
    roomId: "room1"
  };
  @ViewChild('scrollContainer') private scrollContainer: any;
  public form!: FormGroup;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private socketService: WebsocketService
  ) { }
  public userName: string = 'Branm Pabon'; // Remplazar por el user name del usuario logueado
  public userRole: string = 'Developer Full stack';

  public messages: ChatsInterface[] = [
    { sender: 'Branm Pabon', text: 'Hola soy branm', name: 'Usuario logueado', alias: 'YO' },
    { sender: 'Marta Perez', text: 'Hola soy otro usuario', name: 'Other user', alias: 'OT' }
  ];
  public contacts: ClientChatsInterface[] = [
    {
      name: 'Branm Pabon',
      alias: 'YO'
    }
  ]
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
  sendMessage() {
    const newMessageText = this.form.value.newMessageText?.trim();
    if (!newMessageText) return;
    const messageToSend = {
      type: "message",
      roomId: "room1",
      content: this.form.value.newMessageText
    }
    // Mostramos el mensaje directamente en la UI
    this.messages.push({
      sender: this.userName,
      text: newMessageText,
      name: 'Usuario logueado',
      alias: 'YO'
    });

    this.form.get('newMessageText')?.reset();
    this.sendSocket(messageToSend);
  }
  ngOnInit(): void {
    this.socketService.connectSockets();
    this.form = this._formBuilder.group({
      newMessageText: ['', Validators.required],
    });
    this.chatSub = this.socketService.chatEvents$.subscribe({
      next: (msg) => {
        console.log('Llego socket')
        if (msg?.type === 'connection-ack') {
          this.sendSocket(this.userLogin); // Enviar cuando estés seguro
          return;
        }
        // Si es un mensaje de chat
        if (msg?.type === 'message' && msg.content) {
          const isOwnMessage = msg.sender === this.userName;
          this.messages.push({
            sender: msg.sender || 'Desconocido',
            text: msg.content,
            name: isOwnMessage ? 'Usuario logueado' : 'Otro usuario',
            alias: isOwnMessage ? 'YO' : 'OT'
          });

          if (isOwnMessage) {
            this.form.get('newMessageText')?.reset();
          }
        }
      },
      error: (err) => console.error('Error en chat socket:', err),
      complete: () => console.warn('Conexión de chat cerrada')
    });
  }
  sendSocket(object: any) {
    console.log('Enviar a socket')
    this.socketService.sendChatMessage(object);
  }
  ngOnDestroy() {
    this.socketService.disconnectSockets();
    if (this.chatSub) {
      this.chatSub.unsubscribe();
    }
  }
}
