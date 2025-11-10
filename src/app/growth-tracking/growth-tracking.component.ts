import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-growth-tracking',
  imports: [CommonModule,FormsModule],
  templateUrl: './growth-tracking.component.html',
  styleUrl: './growth-tracking.component.scss'
})
export class GrowthTrackingComponent {
  measurements: any[] = [];
  filterCrop = '';
  
  newMeasurement = {
    crop: '',
    height: null as number | null,
    stage: '',
    health: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  };

  isFormValid(): boolean {
    return !!(this.newMeasurement.crop && 
              this.newMeasurement.height && 
              this.newMeasurement.stage && 
              this.newMeasurement.health && 
              this.newMeasurement.date);
  }

  addMeasurement() {
    if (this.isFormValid()) {
      this.measurements.push({...this.newMeasurement});
      this.measurements.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      this.resetForm();
    }
  }

  resetForm() {
    this.newMeasurement = {
      crop: '',
      height: null,
      stage: '',
      health: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    };
  }

  deleteMeasurement(index: number) {
    const filtered = this.getFilteredMeasurements();
    const itemToDelete = filtered[index];
    const actualIndex = this.measurements.indexOf(itemToDelete);
    if (actualIndex > -1) {
      this.measurements.splice(actualIndex, 1);
    }
  }

  getFilteredMeasurements() {
    if (!this.filterCrop) return this.measurements;
    return this.measurements.filter(m => m.crop === this.filterCrop);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR');
  }

  getHealthClass(health: string): string {
    return health.toLowerCase();
  }

  getAverageHeight(): number {
    if (this.measurements.length === 0) return 0;
    const sum = this.measurements.reduce((acc, m) => acc + m.height, 0);
    return Math.round(sum / this.measurements.length);
  }

  getActiveCrops(): number {
    return this.getUniqueCrops().length;
  }

  getHealthyPercentage(): number {
    if (this.measurements.length === 0) return 0;
    const healthy = this.measurements.filter(m => m.health === 'Excellent' || m.health === 'Bon').length;
    return Math.round((healthy / this.measurements.length) * 100);
  }

  getUniqueCrops(): string[] {
    return [...new Set(this.measurements.map(m => m.crop))];
  }

  getCropColor(crop: string): string {
    const colors: any = {
      'Arachide': '#ed8936',
      'Oignon': '#9f7aea',
      'Riz': '#48bb78'
    };
    return colors[crop] || '#667eea';
  }

  getChartPoints(crop: string): string {
    const cropData = this.measurements
      .filter(m => m.crop === crop)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (cropData.length === 0) return '';
    
    const maxHeight = 100;
    const chartHeight = 330;
    const chartWidth = 700;
    const xStep = chartWidth / Math.max(cropData.length - 1, 1);
    
    return cropData.map((m, i) => {
      const x = 50 + (i * xStep);
      const y = 350 - ((m.height / maxHeight) * chartHeight);
      return `${x},${y}`;
    }).join(' ');
  }

  getChartPointsArray(crop: string): any[] {
    const cropData = this.measurements
      .filter(m => m.crop === crop)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (cropData.length === 0) return [];
    
    const maxHeight = 100;
    const chartHeight = 330;
    const chartWidth = 700;
    const xStep = chartWidth / Math.max(cropData.length - 1, 1);
    
    return cropData.map((m, i) => ({
      x: 50 + (i * xStep),
      y: 350 - ((m.height / maxHeight) * chartHeight)
    }));
  }
}