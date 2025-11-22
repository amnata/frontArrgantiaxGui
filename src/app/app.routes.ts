import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SplashComponent } from './splash/splash.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

import { HomeComponent } from './home/home.component';
import { DiseaseDetectionComponent } from './disease-detection/disease-detection.component';
import { CropClassificationComponent } from './crop-classification/crop-classification.component';
import { GrowthTrackingComponent } from './growth-tracking/growth-tracking.component';

import { AboutComponent } from './about/about.component';
import { SettingComponent } from './setting/setting.component';
import { ProfilComponent } from './profil/profil.component';
import { AideComponent } from './aide/aide.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

import { CultureDetailComponent } from './culture-detail/culture-detail.component';
import { AlertsPageComponent } from './alerts-page/alerts-page.component';

import { AuthGuard } from './services/auth.guard.service';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },

  { path: 'home', component: HomeComponent },

  { path: 'detection', component: DiseaseDetectionComponent, canActivate: [AuthGuard] },
  { path: 'classification', component: CropClassificationComponent, canActivate: [AuthGuard] },
  { path: 'tracking', component: GrowthTrackingComponent, canActivate: [AuthGuard] },

  { path: 'about', component: AboutComponent },
  { path: 'aide', component: AideComponent },

  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'chatbot', component: ChatbotComponent, canActivate: [AuthGuard] },

  { path: 'culture/:id', component: CultureDetailComponent, canActivate: [AuthGuard] },

  { path: 'alerts', component: AlertsPageComponent },

  // 👉 TOUJOURS EN DERNIER
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
