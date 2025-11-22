import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { SettingComponent } from '../setting/setting.component';
import { AlertService } from '../services/alert.service';
import { AlertBannerComponent } from '../alert-banner/alert-banner.component';
import { DailyTipWidgetComponent } from '../daily-tip-widget/daily-tip-widget.component';
import { WeatherNotifService } from '../services/weather-notif.service';



@Component({
  selector: 'app-home',
  imports: [CommonModule,ChatbotComponent,SettingComponent,DailyTipWidgetComponent,AlertBannerComponent],
 

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  isAuthenticated = false;
  showLoginModal = false;
    showSettings = false;
  userName = 'Ngor';
    unreadCount = 0;

  
  
  // Données pour les plantes découvertes - AVEC IDs
  discoveredPlants = [
    { 
      id: 1, // ← AJOUTE ID
      name: 'Salade laitue', 
      emoji: '🥬',
      description: "Plante feuillue consommée crue, très cultivée en maraîchage."
    },
    { 
      id: 2, // ← AJOUTE ID
      name: 'Tomate', 
      emoji: '🍅',
      description: "Fruit-légume très populaire, riche en vitamines et facile à cultiver."
    },
    { 
      id: 3, // ← AJOUTE ID
      name: 'Maïs', 
      emoji: '🌽',
      description: "Céréale polyvalente, cultivée pour l'alimentation humaine et animale."
    }
  ];

  // Données pour les plantes les plus cultivées - AVEC IDs
  popularPlants = [
    {
      id: 4, // ← AJOUTE ID
      name: 'Oignon',
      emoji: '🧅',
      description: "Légume très cultivé, utilisé dans de nombreuses recettes traditionnelles."
    },
    {
      id: 5, // ← AJOUTE ID
      name: 'Riz',
      emoji: '🌾',
      description: "Céréale essentielle, cultivée dans les zones humides d'Afrique."
    },
    {
      id: 6, // ← AJOUTE ID
      name: 'Arachide',
      emoji: '🥜',
      description: "Légumineuse fortement cultivée au Sénégal, riche en huile et protéines."
    }
  ];

   constructor(private router: Router, private alertService: AlertService,private weatherService: WeatherNotifService)  {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }
  todayWeather: any;

ngOnInit() {
  // Récupérer le nombre de notifications non lues
  this.alertService.unreadCount$.subscribe(count => {
    this.unreadCount = count;
  });

  // Récupérer la météo du jour (exemple avec Dakar)
  const lat = 14.7891;
const lon = -16.9241;
  this.weatherService.getCurrentWeather(lat, lon).subscribe(data => {
    this.todayWeather = data;
  });
}

  goToAlerts() {
    this.router.navigate(['/alerts']);
  }

  

  // Méthode pour voir les détails d'une plante
  viewPlantDetails(plantId: number) {
    this.router.navigate(['/culture', plantId]);
  }

  // Navigation vers les différentes pages
  navigateToDetection() {
    this.router.navigate(['/detection']);
  }
  
  navigateToClassification() {
    this.router.navigate(['/classification']);
  }
  
  navigateToSuivi() {
    this.router.navigate(['/tracking']);
  }
  
  navigateTologout() {
    this.router.navigate(['/logout']);
  }

  openSettings() {
    this.showSettings = true;
    // Empêcher le scroll du body quand le menu est ouvert
    document.body.style.overflow = 'hidden';
  }

  closeSettings() {
    this.showSettings = false;
    // Réactiver le scroll
    document.body.style.overflow = 'auto';
  }




simulate(type: 'rain' | 'heat' | 'cold') {
  this.weatherService.simulateWeatherAlert(type);
}
 
  
}