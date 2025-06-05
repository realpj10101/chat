import {Component, inject, OnInit} from '@angular/core';
import {ChatSerivce} from '../../services/chat';
import {FormsModule} from '@angular/forms';
import {AppUser} from '../../models/app-user.model';

@Component({
  selector: 'app-chat',
  standalone: true,
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

  getCurrentUser(): AppUser | null {
    const currentUser: string | null = localStorage.getItem('currentUser');

    return  currentUser ? JSON.parse(currentUser) : null;
  }

  sendMessage(): void {
    const currentUser = this.getCurrentUser();

    if (this.messageText.trim() && currentUser) {
      this.chatService.sendMessage(currentUser.userName, this.messageText);
      this.messageText = '';
    }
  }
}
