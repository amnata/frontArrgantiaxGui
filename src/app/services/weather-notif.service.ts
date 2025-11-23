// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AlertService } from './alert.service';

// @Injectable({ providedIn: 'root' })
// export class WeatherNotifService {

//   private apiKey = '25d01cbd844638b7a2a0515ed576f745';

//   constructor(private http: HttpClient, private alertService: AlertService) {
//     // génère une alerte debug au démarrage
//     this.runDebugAlert();
//   }

//   /** ------------------------------
//    * 1) Obtenir la météo
//    * ------------------------------ */
//   getCurrentWeather(lat: number, lon: number) {
//     return this.http.get(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${this.apiKey}`
//     );
//   }
//   getTodayWeather(lat: number, lon: number) {
//   return this.http.get(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${this.apiKey}`
//   );
// }


//   /** ------------------------------
//    * 2) Analyser la météo → Alerte
//    * ------------------------------ */
//   evaluateWeatherAndNotify(data: any) {

//     const temp = data.main?.temp;
//     const humidity = data.main?.humidity;
//     const weather = (data.weather?.[0]?.main || '').toLowerCase();
//     const description = data.weather?.[0]?.description || '';

//     let title = '';
//     let message = '';
//     let level: 'info' | 'warning' | 'danger' = 'info';

//     if (weather.includes('rain') || description.includes('pluie')) {
//       title = '🌧️ Pluie prévue';
//       message = 'Évitez d’arroser aujourd’hui.';
//       level = 'warning';

//     } else if (temp !== undefined && temp > 35) {
//       title = '🔥 Vague de chaleur';
//       message = `Température ${temp}°C — arrosez tôt le matin.`;
//       level = 'warning';

//     } else if (data.wind && data.wind.speed >= 10) {
//       title = '💨 Vent fort';
//       message = `Vent ${data.wind.speed} m/s — protégez serres et supports.`;
//       level = 'warning';

//     } else if (humidity !== undefined && humidity > 85) {
//       title = '💧 Humidité élevée';
//       message = 'Risque accru de maladies fongiques.';
//       level = 'info';

//     } else if (temp !== undefined && temp <= 2) {
//       title = '❄️ Risque de gel';
//       message = `Température ${temp}°C — protéger les jeunes plants.`;
//       level = 'danger';

//     } else {
//       return;
//     }

//     // Notification locale si permise
//     if ('Notification' in window && Notification.permission === 'granted') {
//       new Notification(title, {
//         body: message,
//         icon: 'assets/icons/weather.png'
//       });
//     }

//     // Ajout dans l'historique
//     this.alertService.add({
//       title,
//       message,
//       level
//     });


    
//   }

//   simulateWeatherAlert(type: 'rain' | 'heat' | 'cold') {
//   let data: any = {
//     main: { temp: 25, humidity: 50 },
//     weather: [{ main: 'Clear', description: 'ciel dégagé' }],
//     wind: { speed: 5 }
//   };

//   switch(type) {
//     case 'rain':
//       data.weather[0].main = 'Rain';
//       data.weather[0].description = 'pluie légère';
//       break;
//     case 'heat':
//       data.main.temp = 38;
//       data.weather[0].main = 'Clear';
//       break;
//     case 'cold':
//       data.main.temp = 0;
//       data.weather[0].main = 'Clear';
//       break;
//   }

//   // Appelle la méthode d’évaluation pour créer l’alerte
//   this.evaluateWeatherAndNotify(data);
// }

//   /** ------------------------------
//    * 3) Génère une fausse alerte debug
//    * ------------------------------ */
//   private runDebugAlert() {
//     this.alertService.add({
//       title: '🛠 Mode Debug Actif',
//       message: 'Ceci est un test d’alerte.',
//       level: 'info'
//     });
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class WeatherNotifService {

  private apiKey = '25d01cbd844638b7a2a0515ed576f745';

  constructor(private http: HttpClient, private alertService: AlertService) {
    // ⚠️ PLUS D’ALERTE DEBUG ICI
  }

  /** ------------------------------
   * 1) Obtenir la météo
   * ------------------------------ */
  getCurrentWeather(lat: number, lon: number) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${this.apiKey}`
    );
  }

  getTodayWeather(lat: number, lon: number) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${this.apiKey}`
    );
  }

  /** ------------------------------
   * 2) Analyser la météo → Alerte
   * ------------------------------ */
  evaluateWeatherAndNotify(data: any) {

    const temp = data.main?.temp;
    const humidity = data.main?.humidity;
    const weather = (data.weather?.[0]?.main || '').toLowerCase();
    const description = data.weather?.[0]?.description || '';

    let title = '';
    let message = '';
    let level: 'info' | 'warning' | 'danger' = 'info';

    if (weather.includes('rain') || description.includes('pluie')) {
      title = '🌧️ Pluie prévue';
      message = 'Évitez d’arroser aujourd’hui.';
      level = 'warning';

    } else if (temp !== undefined && temp > 35) {
      title = '🔥 Vague de chaleur';
      message = `Température ${temp}°C — arrosez tôt le matin.`;
      level = 'warning';

    } else if (data.wind && data.wind.speed >= 10) {
      title = '💨 Vent fort';
      message = `Vent ${data.wind.speed} m/s — protégez serres et supports.`;
      level = 'warning';

    } else if (humidity !== undefined && humidity > 85) {
      title = '💧 Humidité élevée';
      message = 'Risque accru de maladies fongiques.';
      level = 'info';

    } else if (temp !== undefined && temp <= 2) {
      title = '❄️ Risque de gel';
      message = `Température ${temp}°C — protéger les jeunes plants.`;
      level = 'danger';

    } else {
      return;
    }

    // Notification locale si permise
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: 'assets/icons/weather.png'
      });
    }

    // Ajout dans l'historique
    this.alertService.add({
      title,
      message,
      level
    });
  }

  /** ------------------------------
   * 3) Simulateur manuel d’alertes
   * ------------------------------ */
  simulateWeatherAlert(type: 'rain' | 'heat' | 'cold') {
    let data: any = {
      main: { temp: 25, humidity: 50 },
      weather: [{ main: 'Clear', description: 'ciel dégagé' }],
      wind: { speed: 5 }
    };

    switch(type) {
      case 'rain':
        data.weather[0].main = 'Rain';
        data.weather[0].description = 'pluie légère';
        break;

      case 'heat':
        data.main.temp = 38;
        break;

      case 'cold':
        data.main.temp = 0;
        break;
    }

    // Crée l'alerte via l'analyse météo
    this.evaluateWeatherAndNotify(data);
  }
}
