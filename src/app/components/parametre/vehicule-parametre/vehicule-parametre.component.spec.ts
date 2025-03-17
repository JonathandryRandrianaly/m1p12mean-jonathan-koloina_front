import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeParametreComponent } from './vehicule-parametre.component';

describe('VehiculeParametreComponent', () => {
  let component: VehiculeParametreComponent;
  let fixture: ComponentFixture<VehiculeParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculeParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
