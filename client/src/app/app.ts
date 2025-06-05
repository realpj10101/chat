import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chat } from "./components/chat/chat";
import { Register} from './components/account/register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Register ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'client';
}
