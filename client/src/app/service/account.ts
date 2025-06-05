import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser} from '../models/app-user.model';
import {map, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _http = inject(HttpClient);
  private _baseUrl = 'http://localhost:5000/api/';
  router = inject(Router);

  register(userInput: AppUser): Observable<AppUser> {
    return this._http.post<AppUser>(this._baseUrl + 'account/register', userInput).pipe(
      map((response) => {
        this.setCurrentUser(response)

        this.router.navigate(['/chat']);

        return response;
      }),
    )
  }

  setCurrentUser(user: AppUser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
