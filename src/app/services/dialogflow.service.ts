import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

interface DialogflowResponse {
  queryResult: {
    fulfillmentText: string;
    intent: {
      displayName: string;
    };
    parameters: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {
  private sessionId: string;
  private apiUrl = 'YOUR_BACKEND_API_URL/dialogflow'; // URL de votre backend proxy

  constructor(private http: HttpClient) {
    // Générer un ID de session unique pour chaque utilisateur
    this.sessionId = uuidv4();
  }

  /**
   * Envoie un message texte à Dialogflow
   */
  sendMessage(message: string, languageCode: string = 'fr'): Observable<DialogflowResponse> {
    const body = {
      sessionId: this.sessionId,
      queryInput: {
        text: {
          text: message,
          languageCode: languageCode
        }
      }
    };

    return this.http.post<DialogflowResponse>(this.apiUrl, body);
  }

  /**
   * Envoie un événement à Dialogflow (pour déclencher des intents spécifiques)
   */
  sendEvent(eventName: string, languageCode: string = 'fr'): Observable<DialogflowResponse> {
    const body = {
      sessionId: this.sessionId,
      queryInput: {
        event: {
          name: eventName,
          languageCode: languageCode
        }
      }
    };

    return this.http.post<DialogflowResponse>(this.apiUrl, body);
  }

  /**
   * Réinitialise la session
   */
  resetSession(): void {
    this.sessionId = uuidv4();
  }

  /**
   * Obtient l'ID de session actuel
   */
  getSessionId(): string {
    return this.sessionId;
  }
}