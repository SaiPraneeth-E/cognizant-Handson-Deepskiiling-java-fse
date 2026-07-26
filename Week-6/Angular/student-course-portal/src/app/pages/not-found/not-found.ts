import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-page">
      <div class="code">404</div>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <a routerLink="/home" class="btn">Go Back Home</a>
    </div>
  `,
  styles: [`
    .not-found-page { text-align: center; padding: 80px 20px; animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .code { font-size: 6rem; font-weight: 900; color: #e0e0e0; line-height: 1; }
    h2 { color: #424242; font-size: 1.8rem; margin: 0 0 12px; }
    p { color: #757575; margin-bottom: 24px; }
    .btn { background: #1565c0; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block; }
  `]
})
export class NotFound {}
