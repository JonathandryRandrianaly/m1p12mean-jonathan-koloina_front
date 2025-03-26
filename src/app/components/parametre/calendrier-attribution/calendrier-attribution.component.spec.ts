import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierAttributionComponent } from './calendrier-attribution.component';

describe('CalendrierAttributionComponent', () => {
  let component: CalendrierAttributionComponent;
  let fixture: ComponentFixture<CalendrierAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendrierAttributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendrierAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
