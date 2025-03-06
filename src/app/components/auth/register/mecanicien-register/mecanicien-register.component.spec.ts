import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicienRegisterComponent } from './mecanicien-register.component';

describe('MecanicienRegisterComponent', () => {
  let component: MecanicienRegisterComponent;
  let fixture: ComponentFixture<MecanicienRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanicienRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanicienRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
