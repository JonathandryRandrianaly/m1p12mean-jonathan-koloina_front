import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquesEntretienComponent } from './historiques-entretien.component';

describe('HistoriquesEntretienComponent', () => {
  let component: HistoriquesEntretienComponent;
  let fixture: ComponentFixture<HistoriquesEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriquesEntretienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquesEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
