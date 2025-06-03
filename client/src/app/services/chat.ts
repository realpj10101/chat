import { Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class Chat {
  private hubConection!: HubConnection;
  private messagesSignal = signal<ChatMessage[]>([]);
  messages = this.messagesSignal.asReadonly();

  private apiUrl = 'http://localhost:5000/api/chat/message';

  startConnection(): void {
    this.hubConection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/chatHub')
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

  async loadMessages(): Promise<void> {
    const res = await fetch(this.apiUrl);
    const data = await res.json();
    this.messagesSignal.set(data);
  }
}
