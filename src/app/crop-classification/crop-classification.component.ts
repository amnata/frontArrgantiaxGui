// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { ClassifierCultureService } from '../services/classifier-culture.service';


// @Component({
//   selector: 'app-crop-classification',
//   imports: [CommonModule],
//   templateUrl: './crop-classification.component.html',
//   styleUrl: './crop-classification.component.scss'
// })
// export class CropClassificationComponent {
//   selectedFile: File | null = null;
//   previewUrl: string | null = null;
//   loading = false;
//   classificationResult: any = null;
//   error: string | null = null;
//   apiStatus: 'online' | 'offline' = 'online';

//   constructor(private classifierService: ClassifierCultureService) {
//     this.checkApiStatus();
//   }

//   checkApiStatus(): void {
//     this.classifierService.healthCheck().subscribe({
//       next: () => {
//         this.apiStatus = 'online';
//         console.log('✅ API Classification Cultures: En ligne');
//       },
//       error: () => {
//         this.apiStatus = 'offline';
//         console.error('❌ API Classification Cultures: Hors ligne');
//       }
//     });
//   }

//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//       this.error = null;
//       this.classificationResult = null;
      
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.previewUrl = reader.result as string;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onClassify(): void {
//     if (!this.selectedFile) {
//       this.error = 'Veuillez sélectionner une image';
//       return;
//     }

//     if (this.apiStatus === 'offline') {
//       this.error = 'Impossible de contacter l\'API de classification. Vérifiez que le serveur est démarré.';
//       return;
//     }

//     this.loading = true;
//     this.error = null;
//     this.classificationResult = null;

//     console.log('🌿 Lancement de la classification de culture');

//     this.classifierService.classifieculture(this.selectedFile).subscribe({
//       next: (result) => {
//         console.log('✅ Réponse API reçue:', result);
//         this.classificationResult = this.formatCropResponse(result);
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('❌ Erreur API:', err);
//         this.error = this.getErrorMessage(err);
//         this.loading = false;
//       }
//     });
//   }

//   formatCropResponse(result: any): any {
//     const cropName = result.predicted_class || result.class || 'Culture inconnue';
    
//     return {
//       icon: this.getCropIcon(cropName),
//       crop: cropName,
//       confidence: Math.round((result.confidence || result.probability || 0) * 100),
//       description: this.getCropDescription(cropName),
//       tips: this.getCropTips(cropName),
//       probabilities: this.formatProbabilities(result.all_predictions || [])
//     };
//   }

//   getCropIcon(crop: string): string {
//     const lowerCrop = crop?.toLowerCase() || '';
//     if (lowerCrop.includes('arachide') || lowerCrop.includes('peanut')) return '🥜';
//     if (lowerCrop.includes('oignon') || lowerCrop.includes('onion')) return '🧅';
//     if (lowerCrop.includes('riz') || lowerCrop.includes('rice')) return '🍚';
//     return '🌱';
//   }

//   getCropDescription(crop: string): string {
//     const lowerCrop = crop?.toLowerCase() || '';
    
//     if (lowerCrop.includes('arachide') || lowerCrop.includes('peanut')) {
//       return 'Légumineuse oléagineuse cultivée pour ses graines riches en huile. Très résistante à la sécheresse et améliore la fertilité du sol.';
//     } else if (lowerCrop.includes('oignon') || lowerCrop.includes('onion')) {
//       return 'Légume bulbe cultivé pour son bulbe aromatique. Sensible aux maladies fongiques et nécessite une rotation culturale stricte.';
//     } else if (lowerCrop.includes('riz') || lowerCrop.includes('rice')) {
//       return 'Culture céréalière de base nécessitant des conditions hydriques contrôlées. Croissance en milieu inondé ou irrigué.';
//     }
    
//     return 'Culture identifiée nécessitant des conditions spécifiques de production.';
//   }

//   getCropTips(crop: string): string[] {
//     const lowerCrop = crop?.toLowerCase() || '';
    
//     if (lowerCrop.includes('arachide') || lowerCrop.includes('peanut')) {
//       return [
//         'Préparer un sol bien drainé et aéré',
//         'Semer en début de saison sèche',
//         'Maintenir un arrosage modéré',
//         'Butter les plants pour favoriser la formation des gousses',
//         'Récolter quand les feuilles jaunissent (90-120 jours)'
//       ];
//     } else if (lowerCrop.includes('oignon') || lowerCrop.includes('onion')) {
//       return [
//         'Choisir un sol riche et bien drainé',
//         'Pratiquer une rotation de 3-4 ans',
//         'Arroser régulièrement sans excès',
//         'Désherber fréquemment',
//         'Récolter quand le feuillage jaunit et se couche'
//       ];
//     } else if (lowerCrop.includes('riz') || lowerCrop.includes('rice')) {
//       return [
//         'Préparer les rizières avec labour et nivellement',
//         'Repiquer les plants à 20-25 jours',
//         'Maintenir une lame d\'eau de 5-10 cm',
//         'Fertiliser en 2-3 apports fractionnés',
//         'Récolter à maturité complète (120-150 jours)'
//       ];
//     }
    
//     return [
//       'Suivre les bonnes pratiques agricoles',
//       'Adapter l\'irrigation aux besoins',
//       'Surveiller l\'état sanitaire',
//       'Respecter les périodes de culture'
//     ];
//   }

//   formatProbabilities(predictions: any[]): any[] {
//     return predictions.map(pred => ({
//       name: `${this.getCropIcon(pred.class)} ${pred.class}`,
//       value: Math.round(pred.probability * 100)
//     })).sort((a, b) => b.value - a.value);
//   }

//   getErrorMessage(err: any): string {
//     if (err.status === 0) {
//       return 'Impossible de contacter le serveur. Vérifiez que le backend est démarré sur http://localhost:8080';
//     } else if (err.status === 404) {
//       return 'Endpoint non trouvé. Vérifiez l\'URL de l\'API.';
//     } else if (err.status === 500) {
//       return 'Erreur serveur. Vérifiez les logs du backend.';
//     } else if (err.error?.message) {
//       return err.error.message;
//     }
//     return 'Une erreur est survenue lors de la classification.';
//   }

//   clear(): void {
//     this.selectedFile = null;
//     this.previewUrl = null;
//     this.classificationResult = null;
//     this.error = null;
//   }
// }


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClassifierCultureService } from '../services/classifier-culture.service';

@Component({
  selector: 'app-crop-classification',
  imports: [CommonModule],
  templateUrl: './crop-classification.component.html',
  styleUrl: './crop-classification.component.scss'
})
export class CropClassificationComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  loading = false;
  classificationResult: any = null;
  error: string | null = null;
  apiStatus: 'online' | 'offline' = 'online';

  constructor(private classifierService: ClassifierCultureService) {
    this.checkApiStatus();
  }

  checkApiStatus(): void {
    this.classifierService.healthCheck().subscribe({
      next: () => {
        this.apiStatus = 'online';
        console.log('✅ API Classification Cultures: En ligne');
      },
      error: () => {
        this.apiStatus = 'offline';
        console.error('❌ API Classification Cultures: Hors ligne');
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.error = null;
      this.classificationResult = null;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onClassify(): void {
    if (!this.selectedFile) {
      this.error = 'Veuillez sélectionner une image';
      return;
    }

    if (this.apiStatus === 'offline') {
      this.error = 'Impossible de contacter l\'API de classification. Vérifiez que le serveur est démarré.';
      return;
    }

    this.loading = true;
    this.error = null;
    this.classificationResult = null;

    console.log('🌿 Lancement de la classification de culture');
    console.log('📄 Fichier sélectionné:', this.selectedFile.name, this.selectedFile.type, this.selectedFile.size);

    this.classifierService.classifieculture(this.selectedFile).subscribe({
      next: (result) => {
        // ✅ AJOUT DE LOGS DÉTAILLÉS
        console.log('✅ Réponse API BRUTE reçue:', result);
        console.log('📊 Type de réponse:', typeof result);
        console.log('🔍 Clés de la réponse:', Object.keys(result));
        console.log('🎯 predicted_class:', result.predicted_class);
        console.log('🎯 class:', result.class);
        console.log('📈 confidence:', result.confidence);
        console.log('📈 probability:', result.probability);
        console.log('📋 all_predictions:', result.all_predictions);
        
        this.classificationResult = this.formatCropResponse(result);
        console.log('✨ Résultat formaté:', this.classificationResult);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erreur API:', err);
        console.error('📛 Status:', err.status);
        console.error('📛 Message:', err.message);
        console.error('📛 Error Object:', err.error);
        this.error = this.getErrorMessage(err);
        this.loading = false;
      }
    });
  }

  formatCropResponse(result: any): any {
    // ✅ VÉRIFICATION DÉTAILLÉE DES CHAMPS
    console.log('🔧 Formatage de la réponse...');
    
    // Essayer différentes variantes de noms de champs
  const cropName = String(
  result.class_label ||
  result.predicted_class ||
  result.class ||
  result.prediction ||
  result.label ||
  result.crop ||
  'Culture inconnue'
);
    const confidence = result.confidence 
                    || result.probability 
                    || result.score 
                    || 0;
    
    const allPredictions = result.all_predictions 
                        || result.predictions 
                        || result.probabilities   // ✅ ajout ici
                        || result.classes 
                        || [];
    
    console.log('📝 Crop Name extrait:', cropName);
    console.log('📊 Confidence extraite:', confidence);
    console.log('📋 All Predictions:', allPredictions);
    
    return {
      icon: this.getCropIcon(cropName),
      crop: cropName,
      confidence: Math.round(confidence * 100),
      description: this.getCropDescription(cropName),
      tips: this.getCropTips(cropName),
      probabilities: this.formatProbabilities(allPredictions),
      rawResponse: result // ✅ Garder la réponse brute pour debug
    };
  }

  getCropIcon(crop: string): string {
    const lowerCrop = crop?.toLowerCase() || '';
    if (lowerCrop.includes('arachide') || lowerCrop.includes('peanut') || lowerCrop.includes('groundnut')) return '🥜';
    if (lowerCrop.includes('oignon') || lowerCrop.includes('onion')) return '🧅';
    if (lowerCrop.includes('riz') || lowerCrop.includes('rice') || lowerCrop.includes('paddy')) return '🍚';
    return '🌱';
  }

  getCropDescription(crop: string): string {
    const lowerCrop = crop?.toLowerCase() || '';
    
    if (lowerCrop.includes('arachide') || lowerCrop.includes('peanut')) {
      return 'Légumineuse oléagineuse cultivée pour ses graines riches en huile. Très résistante à la sécheresse et améliore la fertilité du sol.';
    } else if (lowerCrop.includes('oignon') || lowerCrop.includes('onion')) {
      return 'Légume bulbe cultivé pour son bulbe aromatique. Sensible aux maladies fongiques et nécessite une rotation culturale stricte.';
    } else if (lowerCrop.includes('riz') || lowerCrop.includes('rice')) {
      return 'Culture céréalière de base nécessitant des conditions hydriques contrôlées. Croissance en milieu inondé ou irrigué.';
    }
    
    return 'Culture identifiée nécessitant des conditions spécifiques de production.';
  }

  getCropTips(crop: string): string[] {
    const lowerCrop = crop?.toLowerCase() || '';
    
    if (lowerCrop.includes('arachide') || lowerCrop.includes('peanut')) {
      return [
        'Préparer un sol bien drainé et aéré',
        'Semer en début de saison sèche',
        'Maintenir un arrosage modéré',
        'Butter les plants pour favoriser la formation des gousses',
        'Récolter quand les feuilles jaunissent (90-120 jours)'
      ];
    } else if (lowerCrop.includes('oignon') || lowerCrop.includes('onion')) {
      return [
        'Choisir un sol riche et bien drainé',
        'Pratiquer une rotation de 3-4 ans',
        'Arroser régulièrement sans excès',
        'Désherber fréquemment',
        'Récolter quand le feuillage jaunit et se couche'
      ];
    } else if (lowerCrop.includes('riz') || lowerCrop.includes('rice')) {
      return [
        'Préparer les rizières avec labour et nivellement',
        'Repiquer les plants à 20-25 jours',
        'Maintenir une lame d\'eau de 5-10 cm',
        'Fertiliser en 2-3 apports fractionnés',
        'Récolter à maturité complète (120-150 jours)'
      ];
    }
    
    return [
      'Suivre les bonnes pratiques agricoles',
      'Adapter l\'irrigation aux besoins',
      'Surveiller l\'état sanitaire',
      'Respecter les périodes de culture'
    ];
  }

formatProbabilities(predictions: any[]): any[] {
  if (!Array.isArray(predictions) || predictions.length === 0) {
    console.warn('⚠️ Aucune prédiction à formater');
    return [];
  }

  // Cas où on a une liste imbriquée (ex: [[0.97, 0.02, 0.01]])
  if (Array.isArray(predictions[0]) && typeof predictions[0][0] === 'number') {
    const classes = ['Arachide', 'Oignon', 'Riz']; // ⚡ ordre backend
    const probs = predictions[0];

  return probs.map((p: number, i: number) => ({
    name: `${this.getCropIcon(classes[i])} ${classes[i]}`,
    value: Math.round(p * 100)
  })).sort((a, b) => b.value - a.value);

  }

  // Cas où on a juste une liste de nombres (ex: [0.97, 0.02, 0.01])
  if (typeof predictions[0] === 'number') {
    const classes = ['Arachide', 'Oignon', 'Riz']; // ⚡ ordre backend
    return predictions.map((p: number, i: number) => ({
      name: `${this.getCropIcon(classes[i])} ${classes[i]}`,
      value: Math.round(p * 100)
    })).sort((a, b) => b.value - a.value);
  }

  // Cas classique (objet avec class + probability)
  console.log('📊 Formatage des probabilités:', predictions);
  return predictions.map(pred => {
    const className = pred.class || pred.label || pred.name || 'Inconnu';
    const probability = pred.probability || pred.confidence || pred.score || 0;
    return {
      name: `${this.getCropIcon(className)} ${className}`,
      value: Math.round(probability * 100)
    };
  }).sort((a, b) => b.value - a.value);
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
    return 'Une erreur est survenue lors de la classification.';
  }

  clear(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.classificationResult = null;
    this.error = null;
  }
}