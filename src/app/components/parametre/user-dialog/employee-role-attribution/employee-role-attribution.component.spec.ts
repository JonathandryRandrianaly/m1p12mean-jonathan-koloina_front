import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoleAttributionComponent } from './employee-role-attribution.component';

describe('EmployeeRoleAttributionComponent', () => {
  let component: EmployeeRoleAttributionComponent;
  let fixture: ComponentFixture<EmployeeRoleAttributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRoleAttributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRoleAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
