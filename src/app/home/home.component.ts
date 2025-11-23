import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChatbotComponent } from '../chatbot/chatbot.component';
import { SettingComponent } from '../setting/setting.component';

import { AlertService } from '../services/alert.service';
import { WeatherNotifService } from '../services/weather-notif.service';

import { AlertBannerComponent } from '../alert-banner/alert-banner.component';
import { DailyTipWidgetComponent } from '../daily-tip-widget/daily-tip-widget.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ChatbotComponent,
    SettingComponent,
    DailyTipWidgetComponent,
    AlertBannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: { nom: string; prenom: string } | null = null;

  isAuthenticated = false;
  showLoginModal = false;
  showSettings = false;

  unreadCount = 0;

  todayWeather: any;

  // Liste des plantes découvertes
  discoveredPlants = [
    { id: 1, name: 'Salade laitue', emoji: '🥬', description: "Plante feuillue consommée crue, très cultivée en maraîchage." },
    { id: 2, name: 'Tomate', emoji: '🍅', description: "Fruit-légume très populaire, riche en vitamines et facile à cultiver." },
    { id: 3, name: 'Maïs', emoji: '🌽', description: "Céréale polyvalente, cultivée pour l'alimentation humaine et animale." }
  ];

  // Plantes les plus cultivées
  popularPlants = [
    { id: 4, name: 'Oignon', emoji: '🧅', description: "Légume très cultivé, utilisé dans de nombreuses recettes traditionnelles." },
    { id: 5, name: 'Riz', emoji: '🌾', description: "Céréale essentielle, cultivée dans les zones humides d'Afrique." },
    { id: 6, name: 'Arachide', emoji: '🥜', description: "Légumineuse fortement cultivée au Sénégal, riche en huile et protéines." }
  ];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private weatherService: WeatherNotifService,
    private userService: UserService
  ) { 
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  ngOnInit() {
   // S'abonner au BehaviorSubject pour afficher le prénom immédiatement dès qu'il est disponible
  this.userService.currentUser$.subscribe(user => {
    this.user = user;
  });

  // Si user non présent (login récent), charger depuis le backend
  if (!this.user) {
    this.userService.fetchCurrentUser().subscribe();
  }
    // Compter les alertes non lues
    this.alertService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });

    // Charger la météo (Dakar)
    const lat = 14.7891;
    const lon = -16.9241;

    this.weatherService.getCurrentWeather(lat, lon).subscribe(data => {
      this.todayWeather = data;
    });
  }

  // Ouvre la page alertes
  goToAlerts() {
    this.router.navigate(['/alerts']);
  }

  // Navigation vers les pages principales
  navigateToDetection() { this.router.navigate(['/detection']); }
  navigateToClassification() { this.router.navigate(['/classification']); }
  navigateToSuivi() { this.router.navigate(['/tracking']); }
  navigateTologout() { this.router.navigate(['/logout']); }

  // Ouvrir une plante
  viewPlantDetails(id: number) {
    this.router.navigate(['/culture', id]);
  }

  // Ouvrir/fermer paramètres
  openSettings() {
    this.showSettings = true;
    document.body.style.overflow = 'hidden';
  }

  closeSettings() {
    this.showSettings = false;
    document.body.style.overflow = 'auto';
  }

  // Simulation d’alertes météo
  simulate(type: 'rain' | 'heat' | 'cold') {
    this.weatherService.simulateWeatherAlert(type);
  }
}
