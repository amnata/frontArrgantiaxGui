import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertLevel = 'info' | 'warning' | 'danger';

export interface AlertItem {
  id: number;
  title: string;
  message: string;
  level: AlertLevel;
  date: string;
  read: boolean;
  timestamp?: Date; 
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private storageKey = 'alerts';
  private idCounter = Date.now();

  private alertsSubject = new BehaviorSubject<AlertItem[]>(this.load());
  alerts$ = this.alertsSubject.asObservable();

  private unreadSubject = new BehaviorSubject<number>(this.getUnreadCount());
  unreadCount$ = this.unreadSubject.asObservable();

  constructor() {}

  private load(): AlertItem[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  private save(list: AlertItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
    this.alertsSubject.next(list);
    this.updateUnread();
  }

  private getUnreadCount(): number {
    return this.load().filter(a => !a.read).length;
  }

  private updateUnread() {
    this.unreadSubject.next(this.getUnreadCount());
  }

  add(item: { title: string; message: string; level: AlertLevel }) {
    const alerts = this.load();
    const now = new Date();
    const newAlert: AlertItem = {
      id: this.idCounter++,
      title: item.title,
      message: item.message,
      level: item.level,
      date: now.toISOString(),
      read: false,
      timestamp: now
    };
    alerts.unshift(newAlert);
    this.save(alerts);
  }

  markRead(id: number) {
    const alerts = this.load().map(a => a.id === id ? { ...a, read: true } : a);
    this.save(alerts);
  }

  markAllRead() {
    const alerts = this.load().map(a => ({ ...a, read: true }));
    this.save(alerts);
  }

  remove(id: number) {
    const alerts = this.load().filter(a => a.id !== id);
    this.save(alerts);
  }

  clearAll() {
    this.save([]);
  }
}
