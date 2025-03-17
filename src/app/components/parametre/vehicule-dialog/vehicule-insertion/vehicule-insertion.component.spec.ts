import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeInsertionComponent } from './vehicule-insertion.component';

describe('VehiculeInsertionComponent', () => {
  let component: VehiculeInsertionComponent;
  let fixture: ComponentFixture<VehiculeInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculeInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
