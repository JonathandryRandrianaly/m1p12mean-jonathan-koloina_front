import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieEntretienInsertionComponent } from './categorie-entretien-insertion.component';

describe('CategorieEntretienInsertionComponent', () => {
  let component: CategorieEntretienInsertionComponent;
  let fixture: ComponentFixture<CategorieEntretienInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieEntretienInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieEntretienInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
