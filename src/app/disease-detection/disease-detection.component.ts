import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DetectDeseaseService } from '../services/detect-desease.service';


@Component({
  selector: 'app-disease-detection',
  imports: [CommonModule],
  templateUrl: './disease-detection.component.html',
  styleUrl: './disease-detection.component.scss'
})
export class DiseaseDetectionComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  loading = false;
  detectionResult: any = null;
  error: string | null = null;
  apiStatus: 'online' | 'offline' = 'online';

  constructor(private diseaseService: DetectDeseaseService) {
    this.checkApiStatus();
  }

  checkApiStatus(): void {
    this.diseaseService.healthCheck().subscribe({
      next: () => {
        this.apiStatus = 'online';
        console.log('✅ API Détection Maladies: En ligne');
      },
      error: () => {
        this.apiStatus = 'offline';
        console.error('❌ API Détection Maladies: Hors ligne');
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.error = null;
      this.detectionResult = null;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onDetect(): void {
    if (!this.selectedFile) {
      this.error = 'Veuillez sélectionner une image';
      return;
    }

    if (this.apiStatus === 'offline') {
      this.error = 'Impossible de contacter l\'API de détection. Vérifiez que le serveur est démarré.';
      return;
    }

    this.loading = true;
    this.error = null;
    this.detectionResult = null;

    console.log('🔍 Lancement de la détection de maladies');

    this.diseaseService.detectDisease(this.selectedFile).subscribe({
      next: (result) => {
        console.log('✅ Réponse API reçue:', result);
        this.detectionResult = this.formatDiseaseResponse(result);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erreur API:', err);
        this.error = this.getErrorMessage(err);
        this.loading = false;
      }
    });
  }

  formatDiseaseResponse(result: any): any {
  // On prend d'abord le nom de la maladie réel
  const diseaseName = result.disease_detected || result.class_label || 'Maladie inconnue';

  return {
    disease: diseaseName,
    confidence: Math.round((result.confidence || result.probability || 0) * 100),
    severity: this.calculateSeverity(diseaseName),
    healthStatus: this.getHealthStatus(diseaseName),
    recommendations: this.getRecommendations(diseaseName),
    allPredictions: result.all_predictions || []
  };
}

calculateSeverity(disease: string): string {
  const lowerDisease = (disease || '').toLowerCase();
  if (lowerDisease.includes('sain') || lowerDisease.includes('healthy')) {
    return 'Aucune';
  } else if (lowerDisease.includes('alternaria') || lowerDisease.includes('tache')) {
    return 'Modérée';
  } else if (lowerDisease.includes('virosis') || lowerDisease.includes('blast')) {
    return 'Élevée';
  }
  return 'Modérée';
}


  getHealthStatus(disease: string): string {
    const lowerDisease = disease?.toLowerCase() || '';
    
    if (lowerDisease.includes('sain') || lowerDisease.includes('healthy')) {
      return 'La plante est en excellente santé, sans signe de maladie détectable.';
    } else if (lowerDisease.includes('alternaria')) {
      return 'La plante présente des symptômes d\'Alternaria avec des taches circulaires brunes sur les feuilles.';
    } else if (lowerDisease.includes('virosis')) {
      return 'La plante montre des signes d\'infection virale avec mosaïque et déformation des feuilles.';
    } else if (lowerDisease.includes('rouille')) {
      return 'Présence de pustules orangées caractéristiques de la rouille sur les feuilles.';
    } else if (lowerDisease.includes('blast')) {
      return 'Infection par pyriculariose avec taches en "œil de poisson" sur les feuilles.';
    }
    
    return 'Symptômes de maladie détectés nécessitant une surveillance.';
  }

  getRecommendations(disease: string): string[] {
    const lowerDisease = disease?.toLowerCase() || '';
    
    if (lowerDisease.includes('sain') || lowerDisease.includes('healthy')) {
      return [
        'Continuez les bonnes pratiques culturales',
        'Maintenez une surveillance régulière',
        'Assurez une nutrition équilibrée',
        'Prévenez les stress hydriques'
      ];
    } else if (lowerDisease.includes('alternaria')) {
      return [
        'Retirer et détruire les feuilles infectées',
        'Appliquer un fongicide à base de cuivre',
        'Améliorer la circulation d\'air entre les plants',
        'Éviter l\'arrosage sur le feuillage',
        'Pratiquer la rotation des cultures'
      ];
    } else if (lowerDisease.includes('virosis')) {
      return [
        'Éliminer immédiatement les plants infectés',
        'Contrôler les vecteurs (pucerons, thrips)',
        'Utiliser des plants certifiés sains',
        'Désinfecter les outils de travail',
        'Éviter la propagation mécanique'
      ];
    } else if (lowerDisease.includes('rouille')) {
      return [
        'Appliquer un fongicide spécifique',
        'Éliminer les résidus de culture',
        'Espacer correctement les plants',
        'Utiliser des variétés résistantes',
        'Éviter l\'excès d\'humidité'
      ];
    } else if (lowerDisease.includes('blast')) {
      return [
        'Traitement fongicide systémique urgent',
        'Drainage et gestion de l\'eau',
        'Fertilisation azotée équilibrée',
        'Utiliser des variétés résistantes',
        'Détruire les résidus infectés'
      ];
    }
    
    return [
      'Consulter un agronome pour diagnostic précis',
      'Isoler les plants affectés',
      'Améliorer les conditions de culture',
      'Surveiller l\'évolution des symptômes'
    ];
  }

  getErrorMessage(err: any): string {
    if (err.status === 0) {
      return 'Impossible de contacter le serveur. Vérifiez que le backend est démarré sur http://localhost:8080';
    } else if (err.status === 404) {
      return 'Endpoint non trouvé. Vérifiez l\'URL de l\'API.';
    } else if (err.status === 500) {
      return 'Erreur serveur. Vérifiez les logs du backend.';
    } else if (err.error?.message) {
      return err.error.message;
    }
    return 'Une erreur est survenue lors de la détection.';
  }

  clear(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.detectionResult = null;
    this.error = null;
  }
}