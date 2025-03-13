import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieEntretienParametreComponent } from './categorie-entretien-parametre.component';

describe('CategorieEntretienParametreComponent', () => {
  let component: CategorieEntretienParametreComponent;
  let fixture: ComponentFixture<CategorieEntretienParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieEntretienParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieEntretienParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
