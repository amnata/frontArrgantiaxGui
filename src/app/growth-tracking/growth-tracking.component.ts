import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GrowthService, GrowthRecord, GrowthPredictionResponse } from '../services/growth.service';
import { PlantService, Plant } from '../services/plant.service';

@Component({
  selector: 'app-growth-tracking',
  imports: [CommonModule, FormsModule],
  templateUrl: './growth-tracking.component.html',
  styleUrl: './growth-tracking.component.scss'
})
export class GrowthTrackingComponent implements OnInit {
  measurements: GrowthRecord[] = [];
  plants: Plant[] = [];
  filterCrop = '';
  
  // Données de prédiction IA
  predictions: GrowthPredictionResponse | null = null;
  isLoading = false;
  showPredictions = false;
  
  // Propriétés pour les prédictions
  selectedPlantForPrediction: number = 0;
  selectedCropForPrediction: string = '';
  
  constructor(
    private router: Router,
    private growthService: GrowthService,
    private plantService: PlantService
  ) {}

  newMeasurement = {
    plantId: 0 as number,
    height: null as number | null,
    stage: 'GERMINATION' as string,
    healthStatus: 'BON' as string,
    date: new Date().toISOString().split('T')[0] as string,
    notes: '' as string,
    chlorophyllContent: null as number | null,
    ambientTemperature: null as number | null,
    soilTemperature: null as number | null,
    humidity: null as number | null,
    lightIntensity: null as number | null,
    electrochemicalSignal: null as number | null
  };

  growthStages = [
    { value: 'GERMINATION', label: '🌱 Germination' },
    { value: 'VEGETATION', label: '🌿 Végétation' },
    { value: 'FLORAISON', label: '🌸 Floraison' },
    { value: 'FRUCTIFICATION', label: '🍇 Fructification' },
    { value: 'MATURATION', label: '🌾 Maturation' }
  ];

  healthStatuses = [
    { value: 'EXCELLENT', label: '✅ Excellent' },
    { value: 'BON', label: '🟢 Bon' },
    { value: 'MOYEN', label: '🟡 Moyen' },
    { value: 'FAIBLE', label: '🟠 Faible' },
    { value: 'CRITIQUE', label: '🔴 Critique' }
  ];

//  ngOnInit() {
//   this.plantService.getAllPlants().subscribe({
//     next: (plants: Plant[]) => {
//       this.plants = plants;
//       if (plants.length > 0) {
//         this.newMeasurement.plantId = plants[0].id!;
//         this.selectedPlantForPrediction = plants[0].id!;
//       }

//       // 👉 Charger les mesures maintenant que les plantes sont connues
//       this.loadMeasurements();
//     },
//     error: () => {
//       this.plants = [
//         { id: 1, name: 'Arachide Test', cropType: 'ARACHIDE' },
//         { id: 2, name: 'Oignon Test', cropType: 'OIGNON' },
//         { id: 3, name: 'Riz Test', cropType: 'RIZ' }
//       ];

//       this.loadMeasurements();
//     }
//   });
// }

ngOnInit() {
  console.log('🔄 Initialisation Growth Tracking');
  
  // ❌ SUPPRIMER COMPLÈTEMENT CETTE PARTIE
  // const userId = localStorage.getItem('userId');
  // const token = localStorage.getItem('token');
  // if (!userId || !token) {
  //   this.router.navigate(['/login']);
  //   return;
  // }

  // ✅ GARDER SEULEMENT CECI
  this.plantService.getAllPlants().subscribe({
    next: (plants: Plant[]) => {
      console.log('✅ Plantes chargées:', plants.length);
      this.plants = plants;
      
      if (plants.length > 0) {
        this.newMeasurement.plantId = plants[0].id!;
        this.selectedPlantForPrediction = plants[0].id!;
      }

      this.loadMeasurementsFromBackend();
    },
    error: (error) => {
      console.error('❌ Erreur chargement plantes:', error);
      this.plants = [
        { id: 1, name: 'Arachide Test', cropType: 'ARACHIDE' },
        { id: 2, name: 'Oignon Test', cropType: 'OIGNON' },
        { id: 3, name: 'Riz Test', cropType: 'RIZ' }
      ];
      this.loadMeasurementsFromBackend();
    }
  });
}
// Nouvelle méthode pour charger depuis le backend
loadMeasurementsFromBackend() {
  console.log('📥 Chargement des mesures depuis le backend...');
  
  this.growthService.getAllGrowthRecords().subscribe({
    next: (measurements: GrowthRecord[]) => {
      console.log('✅ Mesures reçues du backend:', measurements.length);
      this.measurements = measurements;
      
      // Sauvegarder en local APRÈS avoir reçu du backend
      this.saveLocalMeasurements();
    },
    error: (error) => {
      console.error('❌ Erreur chargement mesures backend:', error);
      
      // Fallback: charger depuis localStorage
      console.log('🔄 Tentative de chargement depuis localStorage...');
      const localMeasurements = this.getLocalMeasurements();
      
      if (localMeasurements.length > 0) {
        console.log('✅ Mesures trouvées en local:', localMeasurements.length);
        this.measurements = localMeasurements;
      } else {
        console.log('⚠️ Aucune mesure trouvée (ni backend ni local)');
        this.measurements = [];
      }
    }
  });
}

  loadPlants() {
    this.plantService.getAllPlants().subscribe({
      next: (plants: Plant[]) => {
        this.plants = plants;
        if (plants.length > 0) {
          this.newMeasurement.plantId = plants[0].id!;
          this.selectedPlantForPrediction = plants[0].id!;
        }
      },
      error: (error) => {
        console.error('Erreur chargement plantes:', error);
        this.plants = [
          { id: 1, name: 'Arachide Test', cropType: 'ARACHIDE' } as Plant,
          { id: 2, name: 'Oignon Test', cropType: 'OIGNON' } as Plant,
          { id: 3, name: 'Riz Test', cropType: 'RIZ' } as Plant
        ];
      }
    });
  }

  loadMeasurements() {
    this.growthService.getAllGrowthRecords().subscribe({
      next: (measurements: GrowthRecord[]) => {
        this.measurements = measurements;
        this.saveLocalMeasurements();  
      },
      error: (error) => {
        console.error('Erreur chargement mesures:', error);
        this.measurements = this.getLocalMeasurements();
      }
    });
  }

  isFormValid(): boolean {
    return !!(this.newMeasurement.plantId && 
              this.newMeasurement.height && 
              this.newMeasurement.stage && 
              this.newMeasurement.healthStatus && 
              this.newMeasurement.date);
  }

  addMeasurement() {
    if (!this.isFormValid()) return;

    this.isLoading = true;

    const growthRecord: GrowthRecord = {
      plantId: this.newMeasurement.plantId,
      height: this.newMeasurement.height!,
      stage: this.newMeasurement.stage,
      healthStatus: this.newMeasurement.healthStatus,
      date: this.newMeasurement.date,
      notes: this.newMeasurement.notes,
      chlorophyllContent: this.newMeasurement.chlorophyllContent || undefined,
      ambientTemperature: this.newMeasurement.ambientTemperature || undefined,
      soilTemperature: this.newMeasurement.soilTemperature || undefined,
      humidity: this.newMeasurement.humidity || undefined,
      lightIntensity: this.newMeasurement.lightIntensity || undefined,
      electrochemicalSignal: this.newMeasurement.electrochemicalSignal || undefined
    };

    this.growthService.createRecordWithPrediction(growthRecord).subscribe({
      next: (response) => {
        console.log('✅ Mesure enregistrée avec prédiction:', response);
        this.predictions = response.prediction;
        this.showPredictions = true;
        this.loadMeasurements();
        this.saveLocalMeasurements();  
        this.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Erreur avec prédiction, tentative sans IA:', error);
        this.growthService.createGrowthRecord(growthRecord).subscribe({
          next: (record) => {
            console.log('✅ Mesure enregistrée (sans IA):', record);
            this.loadMeasurements();
            this.resetForm();
            this.isLoading = false;
          },
          error: (fallbackError) => {
            console.error('❌ Erreur complète, utilisation locale:', fallbackError);
            this.measurements.push({
              ...growthRecord,
              id: Date.now(),
              plant: this.plants.find(p => p.id === growthRecord.plantId)
            });
            this.saveLocalMeasurements(); 
            this.resetForm();
            this.isLoading = false;
          }
        });
      }
    });
  }

  // Méthode pour obtenir les prédictions par culture
  getPredictionsByCrop() {
    if (!this.selectedCropForPrediction) {
      alert('Veuillez sélectionner une culture pour les prédictions');
      return;
    }

    const plant = this.plants.find(p => p.cropType === this.selectedCropForPrediction);
    
    if (plant) {
      console.log(`🔍 Recherche prédictions pour culture: ${this.selectedCropForPrediction}, plante:`, plant.id);
      this.getPredictions(plant.id);
    } else {
      console.error('❌ Aucune plante trouvée pour la culture:', this.selectedCropForPrediction);
      alert(`Aucune plante trouvée pour la culture ${this.selectedCropForPrediction}`);
    }
  }

  // Méthode améliorée pour les prédictions
  getPredictions(plantId?: number) {
    const targetPlantId = plantId || this.selectedPlantForPrediction;
    
    if (!targetPlantId || targetPlantId === 0) {
      console.error('❌ Aucune plante sélectionnée pour les prédictions');
      alert('Veuillez sélectionner une plante pour obtenir des prédictions');
      return;
    }

    const plant = this.plants.find(p => p.id === targetPlantId);
    if (!plant) {
      console.error('❌ Plante non trouvée:', targetPlantId);
      alert('Plante non trouvée');
      return;
    }

    console.log('🔍 Demande de prédictions pour plante:', plant.name, 'ID:', targetPlantId);

    this.isLoading = true;
    
    this.growthService.getAdvancedStats(targetPlantId).subscribe({
      next: (stats) => {
        console.log('✅ Prédictions reçues:', stats);
        this.predictions = stats.ai_analysis;
        this.showPredictions = true;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Erreur lors de la récupération des prédictions:', error);
        this.getFallbackPredictions(targetPlantId);
        this.isLoading = false;
      }
    });
  }

  // Prédictions de fallback avec toutes les propriétés requises
  private getFallbackPredictions(plantId: number) {
    console.log('🔄 Utilisation des prédictions locales de fallback');
    
    const plant = this.plants.find(p => p.id === plantId);
    const plantMeasurements = this.measurements.filter(m => m.plantId === plantId);
    
    if (plantMeasurements.length === 0) {
      this.predictions = {
        predictions: {
          predicted_height: 50,
          health_score: 0.7,
          growth_rate: 2.5,
          predicted_chlorophyll: 35.0,
          model_used: 'fallback-model'
        },
        recommendations: [
          'Aucune donnée historique disponible',
          'Ajoutez des mesures pour obtenir des prédictions précises'
        ]
      };
    } else {
      const lastMeasurement = plantMeasurements[plantMeasurements.length - 1];
      const avgGrowth = plantMeasurements.reduce((sum, m, i, arr) => {
        if (i === 0) return 0;
        return sum + (m.height - arr[i-1].height);
      }, 0) / (plantMeasurements.length - 1);
      
      this.predictions = {
        predictions: {
          predicted_height: Math.round((lastMeasurement.height + avgGrowth * 7) * 10) / 10,
          health_score: this.calculateHealthScore(lastMeasurement.healthStatus),
          growth_rate: Math.round(avgGrowth * 10) / 10,
          predicted_chlorophyll: lastMeasurement.chlorophyllContent || 35.0,
          model_used: 'local-fallback'
        },
        recommendations: this.generateRecommendations(lastMeasurement, plant)
      };
    }
    
    this.showPredictions = true;
  }

  private calculateHealthScore(healthStatus: string): number {
    const scores = {
      'EXCELLENT': 0.9,
      'BON': 0.7,
      'MOYEN': 0.5,
      'FAIBLE': 0.3,
      'CRITIQUE': 0.1
    };
    return scores[healthStatus as keyof typeof scores] || 0.5;
  }

  private generateRecommendations(measurement: GrowthRecord, plant?: Plant): string[] {
    const recommendations = [];
    
    if (measurement.healthStatus === 'CRITIQUE' || measurement.healthStatus === 'FAIBLE') {
      recommendations.push('🔴 Intervention urgente nécessaire - vérifiez l\'arrosage et les nutriments');
    }
    
    if (measurement.stage === 'GERMINATION') {
      recommendations.push('💧 Maintenez une humidité constante pour une germination optimale');
    } else if (measurement.stage === 'FLORAISON') {
      recommendations.push('🌸 Augmentez légèrement les apports en phosphore pour soutenir la floraison');
    }
    
    if (plant) {
      recommendations.push(`🌱 ${plant.name} nécessite un suivi régulier pendant le stade ${measurement.stage}`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ Votre plante semble en bonne santé - continuez le suivi régulier');
    }
    
    return recommendations;
  }

  resetForm() {
    this.newMeasurement = {
      plantId: this.plants.length > 0 ? this.plants[0].id! : 0,
      height: null,
      stage: 'GERMINATION',
      healthStatus: 'BON',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      chlorophyllContent: null,
      ambientTemperature: null,
      soilTemperature: null,
      humidity: null,
      lightIntensity: null,
      electrochemicalSignal: null
    };
  }

 deleteMeasurement(index: number) {
  const filtered = this.getFilteredMeasurements();
  const measurement = filtered[index];
  
  if (!measurement.id) {
    console.warn('⚠️ Pas d\'ID pour cette mesure, suppression locale uniquement');
    this.measurements = this.measurements.filter(m => m !== measurement);
    this.saveLocalMeasurements();
    return;
  }

  console.log('🗑️ Suppression de la mesure ID:', measurement.id);
  
  if (confirm('Êtes-vous sûr de vouloir supprimer cette mesure ?')) {
    this.growthService.deleteGrowthRecord(measurement.id).subscribe({
      next: (response) => {
        console.log('✅ Suppression réussie:', response);
        // Recharger les mesures depuis le backend
        this.loadMeasurementsFromBackend();
      },
      error: (error) => {
        console.error('❌ Erreur suppression:', error);
        if (error.status === 403) {
          alert('Vous n\'êtes pas autorisé à supprimer cette mesure');
        } else if (error.status === 404) {
          alert('Mesure introuvable');
          // Supprimer quand même localement
          this.measurements = this.measurements.filter(m => m.id !== measurement.id);
          this.saveLocalMeasurements();
        } else {
          alert('Erreur lors de la suppression: ' + (error.error?.message || error.message));
        }
      }
    });
  }
}

getFilteredMeasurements(): GrowthRecord[] {
  if (!this.filterCrop) return this.measurements;
  const filter = this.filterCrop.toString().toUpperCase(); // uniformiser
  return this.measurements.filter(m => {
    const plant = this.plants.find(p => p.id === +m.plantId);
    return plant && plant.cropType.toUpperCase() === filter;
  });
}

  // Nouvelle méthode: Obtenir les cultures disponibles depuis les plantes
  getAvailableCrops(): string[] {
    const crops = this.plants.map(plant => plant.cropType);
    return [...new Set(crops)];
  }

  getUniqueCrops(): string[] {
  return [...new Set(
    this.measurements
      .map(m => this.getCropType(m.plantId))
      .filter(crop => crop !== 'Inconnu')
  )];
}

  // Nouvelle méthode: Obtenir le nom d'affichage des cultures
  getCropDisplayName(crop: string): string {
    const cropNames: { [key: string]: string } = {
      'ARACHIDE': '🌰 Arachide',
      'OIGNON': '🧅 Oignon', 
      'RIZ': '🌾 Riz',
      'MAIS': '🌽 Maïs',
      'BLE': '🌾 Blé',
      'TOMATO': '🍅 Tomate'
    };
    return cropNames[crop] || crop;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  }

  getHealthClass(healthStatus: string): string {
    return healthStatus.toLowerCase();
  }

  getAverageHeight(): number {
    if (this.measurements.length === 0) return 0;
    const sum = this.measurements.reduce((acc, m) => acc + m.height, 0);
    return Math.round(sum / this.measurements.length);
  }

  getActiveCrops(): number {
    return this.getUniqueCrops().length;
  }

  getHealthyPercentage(): number {
    if (this.measurements.length === 0) return 0;
    const healthy = this.measurements.filter(m => 
      m.healthStatus === 'EXCELLENT' || m.healthStatus === 'BON'
    ).length;
    return Math.round((healthy / this.measurements.length) * 100);
  }

  getPlantName(plantId: number | string): string {
    const idNum = +plantId; // convertir en nombre
    const plant = this.plants.find(p => p.id === idNum);
    return plant ? plant.name : `Plante ${plantId}`;
  }

  getCropType(plantId: number | string): string {
    const idNum = +plantId; // convertir en nombre
    const plant = this.plants.find(p => p.id === idNum);
    return plant ? plant.cropType : 'Inconnu';
  }

  getCropColor(crop: string): string {
    const colors: { [key: string]: string } = {
      'ARACHIDE': '#ed8936',
      'OIGNON': '#9f7aea', 
      'RIZ': '#48bb78'
    };
    return colors[crop] || '#667eea';
  }

  getChartPoints(crop: string): string {
    const cropMeasurements = this.measurements.filter(m => {
      const plantCrop = this.getCropType(m.plantId);
        return plantCrop.toUpperCase() === crop.toUpperCase(); 
    }).sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
    
    if (cropMeasurements.length === 0) return '';
    
    const maxHeight = Math.max(...cropMeasurements.map(m => m.height), 100);
    const chartHeight = 330;
    const chartWidth = 700;
    const xStep = chartWidth / Math.max(cropMeasurements.length - 1, 1);
    
    return cropMeasurements.map((m, i) => {
      const x = 50 + (i * xStep);
      const y = 350 - ((m.height / maxHeight) * chartHeight);
      return `${x},${y}`;
    }).join(' ');
  }

  getChartPointsArray(crop: string): any[] {
    const cropMeasurements = this.measurements.filter(m => {
      const plantCrop = this.getCropType(m.plantId);
      return plantCrop === crop;
    }).sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
    
    if (cropMeasurements.length === 0) return [];
    
    const maxHeight = Math.max(...cropMeasurements.map(m => m.height), 100);
    const chartHeight = 330;
    const chartWidth = 700;
    const xStep = chartWidth / Math.max(cropMeasurements.length - 1, 1);
    
    return cropMeasurements.map((m, i) => ({
      x: 50 + (i * xStep),
      y: 350 - ((m.height / maxHeight) * chartHeight),
      height: m.height,
      date: m.date
    }));
  }
  get displayPrediction() {
  if (!this.predictions) return {
    predicted_height: 0,
    health_score: 0,
    growth_rate: 0,
    predicted_chlorophyll: 0
  };

  return 'predictions' in this.predictions
    ? this.predictions.predictions
    : this.predictions;
}


  goHome() {
    this.router.navigate(['/home']);
  }

  // private getLocalMeasurements(): GrowthRecord[] {
  //   try {
  //     const saved = localStorage.getItem('growthMeasurements');
  //     return saved ? JSON.parse(saved) : [];
  //   } catch {
  //     return [];
  //   }
  // }

private getLocalMeasurements(): GrowthRecord[] {
  try {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.warn('⚠️ Pas d\'userId en localStorage');
      return [];
    }
    
    const key = `growthMeasurements_${userId}`;
    const saved = localStorage.getItem(key);
    
    if (!saved) {
      console.log('ℹ️ Aucune mesure locale trouvée pour user', userId);
      return [];
    }
    
    const measurements = JSON.parse(saved);
    console.log('✅ Mesures locales chargées:', measurements.length);
    return measurements;
    
  } catch (error) {
    console.error('❌ Erreur lecture localStorage:', error);
    return [];
  }
}

private saveLocalMeasurements() {
  try {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.warn('⚠️ Impossible de sauvegarder: pas d\'userId');
      return;
    }
    
    const key = `growthMeasurements_${userId}`;
    localStorage.setItem(key, JSON.stringify(this.measurements));
    console.log('💾 Mesures sauvegardées en local:', this.measurements.length);
    
  } catch (error) {
    console.error('❌ Erreur sauvegarde localStorage:', error);
  }
}

//   private getLocalMeasurements(): GrowthRecord[] {
//     const userId = localStorage.getItem('userId');
//     if (!userId) return [];

//     const saved = localStorage.getItem(`growthMeasurements_${userId}`);
//     return saved ? JSON.parse(saved) : [];
//   }



//   private saveLocalMeasurements() {
//   const userId = localStorage.getItem('userId');
//   if (!userId) return;
  
//   localStorage.setItem(
//     `growthMeasurements_${userId}`,
//     JSON.stringify(this.measurements)
//   );
// }

}