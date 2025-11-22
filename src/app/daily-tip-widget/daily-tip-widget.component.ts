import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-tip-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-tip-widget.component.html',
  styleUrls: ['./daily-tip-widget.component.scss']
})
export class DailyTipWidgetComponent implements OnInit {
  tip = { title: '', message: '' };
  tips = [
    { title: '💧 Irrigation intelligente', message: "Arrosez tôt le matin pour réduire l'évaporation." },
    { title: '🌱 Santé du sol', message: "Alternez les cultures pour maintenir la fertilité." },
    { title: '🐞 Lutte biologique', message: "Utilisez des auxiliaires (coccinelles) contre les pucerons." },
    { title: '🌾 Fertilisation', message: "Compost organique pour enrichir le sol." }
  ];

  ngOnInit() {
    this.pickRandomTip();
  }

  pickRandomTip() {
    this.tip = this.tips[Math.floor(Math.random() * this.tips.length)];
  }

  refresh() { this.pickRandomTip(); }
}
