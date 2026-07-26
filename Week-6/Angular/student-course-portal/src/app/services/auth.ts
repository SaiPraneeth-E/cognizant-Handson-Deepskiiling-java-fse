import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = true;
  private userName = 'Sai Praneeth E';
  private role = 'Student';

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserName(): string {
    return this.userName;
  }

  getRole(): string {
    return this.role;
  }

  login(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
  }
}
