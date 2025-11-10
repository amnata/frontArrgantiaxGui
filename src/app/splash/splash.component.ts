import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  fadeOut = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Commencer la transition après 4 secondes
    setTimeout(() => {
      this.fadeOut = true;
    }, 4000);

    // Rediriger après 5 secondes au total
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000);
  }
}