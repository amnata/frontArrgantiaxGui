import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aide',
  imports: [],
  templateUrl: './aide.component.html',
  styleUrl: './aide.component.scss'
})
export class AideComponent {
  constructor(private router:Router){}

    goHome(){
    this.router.navigate(['/home']);
  }
}

