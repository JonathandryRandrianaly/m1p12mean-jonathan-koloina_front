import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSpecialisationAttributionComponent } from './employee-specialisation-attribution.component';

describe('EmployeeSpecialisationAttributionComponent', () => {
  let component: EmployeeSpecialisationAttributionComponent;
  let fixture: ComponentFixture<EmployeeSpecialisationAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSpecialisationAttributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSpecialisationAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
