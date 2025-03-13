import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleInsertionComponent } from './role-insertion.component';

describe('RoleInsertionComponent', () => {
  let component: RoleInsertionComponent;
  let fixture: ComponentFixture<RoleInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
