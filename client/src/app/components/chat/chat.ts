import { Component, inject, OnInit } from '@angular/core';
import { ChatSerivce } from '../../services/chat';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat implements OnInit {
  chatService = inject(ChatSerivce);
  user = 'User' + Math.floor(Math.random() * 1000);
  messageText = '';

  messages = this.chatService.messages;

  ngOnInit(): void {
    this.chatService.startConnection();

    this.chatService.loadMessage().subscribe();
  }

  sendMessage(): void {
    if (this.messageText.trim()) {
      this.chatService.sendMessage(this.user, this.messageText);
      this.messageText = '';
    }
  }
}
