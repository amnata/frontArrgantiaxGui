import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Plant {
  id: number;
  name: string;
  cropType: string;
  plantingDate?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = 'http://localhost:8080/api/plants';

  constructor(private http: HttpClient) {}

  getAllPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('❌ Erreur API plantes, utilisation du fallback:', error);
        return this.getFallbackPlants();
      }),
      map(plants => {
        // S'assurer que toutes les plantes ont un cropType
        return plants.map(plant => ({
          ...plant,
          cropType: plant.cropType || 'GENERAL'
        }));
      })
    );
  }

  // ✅ Fallback avec des plantes de test
  private getFallbackPlants(): Observable<Plant[]> {
    console.log('🔄 Utilisation des plantes de fallback');
    
    const fallbackPlants: Plant[] = [
      { 
        id: 1, 
        name: 'Arachide Nord', 
        cropType: 'ARACHIDE',
        plantingDate: '2024-01-15',
        status: 'ACTIVE'
      },
      { 
        id: 2, 
        name: 'Oignon Rouge', 
        cropType: 'OIGNON',
        plantingDate: '2024-01-20',
        status: 'ACTIVE'
      },
      { 
        id: 3, 
        name: 'Riz Blanc', 
        cropType: 'RIZ',
        plantingDate: '2024-01-10',
        status: 'ACTIVE'
      },
      { 
        id: 4, 
        name: 'Arachide Sud', 
        cropType: 'ARACHIDE',
        plantingDate: '2024-01-25',
        status: 'ACTIVE'
      },
      { 
        id: 5, 
        name: 'Oignon Jaune', 
        cropType: 'OIGNON',
        plantingDate: '2024-01-18',
        status: 'ACTIVE'
      }
    ];

    return of(fallbackPlants);
  }

  // ✅ Méthode pour obtenir une plante par ID
  getPlantById(id: number): Observable<Plant | undefined> {
    return this.getAllPlants().pipe(
      map(plants => plants.find(plant => plant.id === id))
    );
  }

  // ✅ Méthode pour obtenir les plantes par type de culture
  getPlantsByCropType(cropType: string): Observable<Plant[]> {
    return this.getAllPlants().pipe(
      map(plants => plants.filter(plant => plant.cropType === cropType))
    );
  }
}