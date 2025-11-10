import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropClassificationComponent } from './crop-classification.component';

describe('CropClassificationComponent', () => {
  let component: CropClassificationComponent;
  let fixture: ComponentFixture<CropClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropClassificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
