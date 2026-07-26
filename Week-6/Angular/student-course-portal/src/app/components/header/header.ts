import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <span class="logo">🎓</span>
        <span class="brand-name">Student Course Portal</span>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
        <li><a routerLink="/courses" routerLinkActive="active">Courses</a></li>
        <li><a routerLink="/profile" routerLinkActive="active">My Profile</a></li>
        <li><a routerLink="/enroll" routerLinkActive="active">Enroll</a></li>
        <li><a routerLink="/enroll-reactive" routerLinkActive="active">Reactive Form</a></li>
      </ul>
      <div class="user-info">
        <span class="avatar">{{ auth.getUserName().charAt(0) }}</span>
        <span class="username">{{ auth.getUserName() }}</span>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #1a237e, #283593);
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      height: 64px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .nav-brand { display: flex; align-items: center; gap: 10px; }
    .logo { font-size: 1.6rem; }
    .brand-name { font-size: 1.1rem; font-weight: 700; letter-spacing: 0.5px; }
    .nav-links { list-style: none; display: flex; gap: 4px; margin: 0; padding: 0; }
    .nav-links a {
      color: rgba(255,255,255,0.85);
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s;
    }
    .nav-links a:hover, .nav-links a.active {
      background: rgba(255,255,255,0.15);
      color: white;
    }
    .user-info { display: flex; align-items: center; gap: 10px; }
    .avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: #42a5f5; display: flex; align-items: center;
      justify-content: center; font-weight: 700; font-size: 1rem;
    }
    .username { font-size: 0.85rem; color: rgba(255,255,255,0.9); }
  `]
})
export class Header {
  constructor(public auth: AuthService) {}
}
