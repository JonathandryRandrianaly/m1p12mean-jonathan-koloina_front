import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieModeleParametreComponent } from './categorie-modele-parametre.component';

describe('CategorieModeleParametreComponent', () => {
  let component: CategorieModeleParametreComponent;
  let fixture: ComponentFixture<CategorieModeleParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieModeleParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieModeleParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
