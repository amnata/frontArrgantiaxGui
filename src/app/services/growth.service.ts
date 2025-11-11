import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GrowthRecord {
  id?: number;
  plantId: number;
  date: string;
  height: number;
  stage: string;
  healthStatus: string;
  chlorophyllContent?: number;
  ambientTemperature?: number;
  soilTemperature?: number;
  humidity?: number;
  lightIntensity?: number;
  electrochemicalSignal?: number;
  notes?: string;
  plant?: any;
}

export interface GrowthPredictionResponse {
  predictions: {
    predicted_height: number;
    health_score: number;
    growth_rate: number;
    predicted_chlorophyll: number;
    model_used: string;
    confidence_score?: number;
  };
  recommendations: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GrowthService {
  private apiUrl = 'http://localhost:8080/api/growth';

  constructor(private http: HttpClient) {}

  getAllGrowthRecords(): Observable<GrowthRecord[]> {
    return this.http.get<GrowthRecord[]>(`${this.apiUrl}/records`);
  }

  createGrowthRecord(record: GrowthRecord): Observable<GrowthRecord> {
    return this.http.post<GrowthRecord>(`${this.apiUrl}/records`, record);
  }

  createRecordWithPrediction(record: GrowthRecord): Observable<{record: GrowthRecord, prediction: GrowthPredictionResponse}> {
    return this.http.post<{record: GrowthRecord, prediction: GrowthPredictionResponse}>(`${this.apiUrl}/records-with-prediction`, record);
  }

  getAdvancedStats(plantId: number): Observable<{ai_analysis: GrowthPredictionResponse}> {
    return this.http.get<{ai_analysis: GrowthPredictionResponse}>(`${this.apiUrl}/stats/${plantId}`);
  }

  deleteGrowthRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/records/${id}`);
  }
}