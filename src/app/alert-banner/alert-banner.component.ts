import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, AlertItem } from '../services/alert.service';

@Component({
  selector: 'app-alert-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss']
})
export class AlertBannerComponent implements OnInit {
    @Input() top!: AlertItem | null;   // si tu passes un objet AlertItem
  @Input() pulse: boolean = false;
  @Input() unread: number = 0;



  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alerts$.subscribe((list: AlertItem[]) => {
      this.unread = list.filter((a: AlertItem) => !a.read).length;
    });
  }
}
