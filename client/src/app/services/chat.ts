import { inject, Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../models/chat-message.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatSerivce {
  private hubConection!: HubConnection;
  private messagesSignal = signal<ChatMessage[]>([]);
  messages = this.messagesSignal.asReadonly();
  private _http = inject(HttpClient);

  private apiUrl = 'http://localhost:5119/api/chat/message';

  startConnection(): void {
    this.hubConection = new HubConnectionBuilder()
      .withUrl('http://localhost:5119/chatHub')
      .build();

    this.hubConection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch((err) => console.error('SignalR connection error: ', err));

    this.hubConection.on(
      'RecieveMessage',
      (user: string, message: string,) => {
        const newMessage: ChatMessage = { user, message };
        this.messagesSignal.update((msgs) => [...msgs, newMessage]);
      }
    );
  }

  sendMessage(user: string, message: string): void {
    this.hubConection.invoke('SendMessage', user, message).catch(console.error);
  }

  loadMessage() {
    return this._http.get<ChatMessage[]>(this.apiUrl).pipe(
      tap((messages) => this.messagesSignal.set(messages))
    )
  }
}
