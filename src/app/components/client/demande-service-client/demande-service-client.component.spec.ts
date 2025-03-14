import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeServiceClientComponent } from './demande-service-client.component';

describe('DemandeServiceClientComponent', () => {
  let component: DemandeServiceClientComponent;
  let fixture: ComponentFixture<DemandeServiceClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeServiceClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeServiceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
