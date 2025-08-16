import { inject, Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retry, RetryConfig, Subject, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../modules/auth/services/auth.service';
const apiUrl = environment.apiUrl;
const retryConfig: RetryConfig = {
  delay: 5000,
};
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // private notifySocket$: WebSocketSubject<any> | null = null;
  private chatSocket$: WebSocketSubject<any> | null = null;
  // public notifyEvents$ = new Subject<any>();
  private chatSocketSubscription: Subscription | null = null;
  public chatEvents$ = new Subject<any>();
  private authService = inject(AuthService);
  private token = this.authService.getToken();
  private isConnectedChat = false;  // Flag para evitar reconexiones innecesarias

  constructor() { }
  connectSockets() {
    // if (!this.notifySocket$) {
    //   this.notifySocket$ = webSocket(`ws://localhost:3000/chat/notify?x-token=${this.token}}`);
    //   this.notifySocket$?.subscribe({
    //     next: msg => this.notifyEvents$.next(msg),
    //     error: err => console.error('Notify socket error:', err),
    //     complete: () => console.warn('Notify socket closed')
    //   });
    // }
    if (!this.isConnectedChat) {
      this.connectChatSocket();
    }
  }
  private connectChatSocket() {
    // Si ya existe una suscripción, desuscribirse antes de crear una nueva
    if (this.chatSocketSubscription) {
      this.chatSocketSubscription.unsubscribe();
      this.chatSocketSubscription = null;
    }
    this.chatSocket$ = webSocket(`${apiUrl}/chat/rooms?x-token=${this.token}`);
    this.chatSocketSubscription = this.chatSocket$?.pipe(retry(retryConfig)).subscribe({
      next: msg => this.chatEvents$.next(msg),
      error: err => console.error(err),
      complete: () => console.log('Completo'),
    });
    this.isConnectedChat = true;
  }

  sendChatMessage(message: any) {
    if (this.chatSocket$) {
      this.chatSocket$?.next(message);
    }
  }
  disconnectSockets() {
    if (this.chatSocket$) {
      this.disconnectChatSocket();
    }
    //if (this.notifySocket$) {
    // this.notifySocket$?.complete();
    // this.notifySocket$ = null;
  }
  private disconnectChatSocket() {
    this.chatSocket$?.complete();
    this.chatSocket$ = null;
    if (this.chatSocketSubscription) {
      this.chatSocketSubscription.unsubscribe();
      this.chatSocketSubscription = null;
    }
    // Marcar como desconectado
    this.isConnectedChat = false;
    console.log('Socket desconectado');
  }
}
