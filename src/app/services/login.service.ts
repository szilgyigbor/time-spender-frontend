import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
    private _isLoggedIn = new BehaviorSubject<boolean>(this.isSomeone());
    isLoggedIn$ = this._isLoggedIn.asObservable();

    private isSomeone(): boolean {
        return !!localStorage.getItem('currentUser');
      }

    setLoggedIn(val: boolean) {
        this._isLoggedIn.next(val);
    }

    removeLoggedIn() {
        this._isLoggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}