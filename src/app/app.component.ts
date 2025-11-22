import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherNotifService } from './services/weather-notif.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  constructor(private weatherNotif: WeatherNotifService) {}

  ngOnInit() {
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    this.schedulePeriodicChecks();
  }

  schedulePeriodicChecks() {
    this.checkAndNotify();
    setInterval(() => this.checkAndNotify(), 60 * 60 * 1000); // 1 heure
  }

  checkAndNotify() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          this.weatherNotif.getCurrentWeather(lat, lon).subscribe(
            data => this.weatherNotif.evaluateWeatherAndNotify(data)
          );
        },
        () => {
          // Coordonnées par défaut : Dakar
          this.weatherNotif.getCurrentWeather(14.6937, -17.44406).subscribe(
            data => this.weatherNotif.evaluateWeatherAndNotify(data)
          );
        }
      );
    }
  }
}
