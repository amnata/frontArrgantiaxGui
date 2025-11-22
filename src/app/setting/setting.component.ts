import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {
    
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  closeMenu() {
    this.close.emit();
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
    this.closeMenu();
  }

  navigateToProfile() {
    this.router.navigate(['/profil']);
    this.closeMenu();
  }

  navigateToHelp() {
    this.router.navigate(['/aide']);
    this.closeMenu();
  }

  navigateToLogout() {
    this.router.navigate(['/logout']);
    this.closeMenu();
  }
}