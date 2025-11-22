import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { SettingComponent } from '../setting/setting.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ChatbotComponent,SettingComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isAuthenticated = false;
  showLoginModal = false;
    showSettings = false;
  
  // Données pour les plantes découvertes
  discoveredPlants = [
    { name: 'Oignon', emoji: '🧅' },
    { name: 'Salade laitue', emoji: '🥬' }
  ];
  
  // Données pour les plantes les plus cultivées
  popularPlants = [
    {
      name: 'Riz',
      emoji: '🌾',
      description: "Céréale d'Asie cultivée en Afrique dans les zones humides"
    },
    {
      name: 'Maïs',
      emoji: '🌽',
      description: "Céréale d'Amérique, culture nutritif très répandue"
    }
  ];
  
  constructor(private router: Router) {
    // Vérifier si l'utilisateur est connecté
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
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
}

 