import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueMecanicienComponent } from './historique-mecanicien.component';

describe('HistoriqueMecanicienComponent', () => {
  let component: HistoriqueMecanicienComponent;
  let fixture: ComponentFixture<HistoriqueMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
