import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTipWidgetComponent } from './daily-tip-widget.component';

describe('DailyTipWidgetComponent', () => {
  let component: DailyTipWidgetComponent;
  let fixture: ComponentFixture<DailyTipWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyTipWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyTipWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
