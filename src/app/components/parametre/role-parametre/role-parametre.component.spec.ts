import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleParametreComponent } from './role-parametre.component';

describe('RoleParametreComponent', () => {
  let component: RoleParametreComponent;
  let fixture: ComponentFixture<RoleParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
