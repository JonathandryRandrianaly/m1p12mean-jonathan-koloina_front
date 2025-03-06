import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanicienLoginComponent } from './mecanicien-login.component';

describe('MecanicienLoginComponent', () => {
  let component: MecanicienLoginComponent;
  let fixture: ComponentFixture<MecanicienLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanicienLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanicienLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
