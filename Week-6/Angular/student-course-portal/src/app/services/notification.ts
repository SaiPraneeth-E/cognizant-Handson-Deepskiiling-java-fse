import { Injectable } from '@angular/core';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: Date;
}

@Injectable() // Intentionally NOT providedIn: 'root' — component-level scoping demo
export class NotificationService {
  private notifications: Notification[] = [];
  private idCounter = 1;

  add(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.notifications.push({ id: this.idCounter++, message, type, timestamp: new Date() });
  }

  getAll(): Notification[] {
    return this.notifications;
  }

  clear(): void {
    this.notifications = [];
  }

  remove(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}
