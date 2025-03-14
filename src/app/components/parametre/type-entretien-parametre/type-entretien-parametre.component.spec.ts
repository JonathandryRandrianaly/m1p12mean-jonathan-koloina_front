import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEntretienParametreComponent } from './type-entretien-parametre.component';

describe('TypeEntretienParametreComponent', () => {
  let component: TypeEntretienParametreComponent;
  let fixture: ComponentFixture<TypeEntretienParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEntretienParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEntretienParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
