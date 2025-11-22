import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, AlertItem } from '../services/alert.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alerts-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alerts-page.component.html',
  styleUrls: ['./alerts-page.component.scss']
})
export class AlertsPageComponent implements OnInit {
  alerts: AlertItem[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    // Récupérer les alertes
    this.alertService.alerts$.subscribe((list: AlertItem[]) => {
      this.alerts = list;
    });

    // Marquer toutes les alertes comme lues → badge disparaît
    this.alertService.markAllRead();
  }

  /** Marquer une alerte comme lue individuellement */
  markRead(alert: AlertItem) {
    if (!alert.read) {
      this.alertService.markRead(alert.id);
    }
  }

  /** Supprimer une seule alerte */
  remove(alert: AlertItem) {
    this.alertService.remove(alert.id); 
  }

  /** Supprimer toutes les alertes */
  clearAll() {
    if (confirm('Supprimer toutes les alertes ?')) {
      this.alertService.clearAll();
    }
  }
}
