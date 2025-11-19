import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseDetectionComponent } from './disease-detection/disease-detection.component';
import { CropClassificationComponent } from './crop-classification/crop-classification.component';
import { GrowthTrackingComponent } from './growth-tracking/growth-tracking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SplashComponent } from './splash/splash.component';
import { AuthGuard } from './services/auth.guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detection', component: DiseaseDetectionComponent, canActivate: [AuthGuard] },
  { path: 'classification', component: CropClassificationComponent , canActivate: [AuthGuard] },
  { path: 'tracking', component: GrowthTrackingComponent, canActivate: [AuthGuard] },
  { path: 'chatbot', component: ChatbotComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }