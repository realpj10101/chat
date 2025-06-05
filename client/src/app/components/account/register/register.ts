import {Component, inject} from '@angular/core';
import {AccountService} from '../../../service/account';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppUser} from '../../../models/app-user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  accountService = inject(AccountService);
  fB = inject(FormBuilder);

  registerFg = this.fB.group({
    userNameCtrl: ['', Validators.required]
  })

  get UserNameCtrl(): FormControl {
    return this.registerFg.get('userNameCtrl') as FormControl;
  }

  register(): void {
    let userInput: AppUser = {
      userName: this.UserNameCtrl.value
    }

    this.accountService.register(userInput).subscribe();
  }
}
