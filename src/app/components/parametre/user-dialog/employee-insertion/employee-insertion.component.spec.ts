import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInsertionComponent } from './employee-insertion.component';

describe('EmployeeInsertionComponent', () => {
  let component: EmployeeInsertionComponent;
  let fixture: ComponentFixture<EmployeeInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
