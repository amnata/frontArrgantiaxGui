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

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'detection', component: DiseaseDetectionComponent },
  { path: 'classification', component: CropClassificationComponent },
  { path: 'tracking', component: GrowthTrackingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }