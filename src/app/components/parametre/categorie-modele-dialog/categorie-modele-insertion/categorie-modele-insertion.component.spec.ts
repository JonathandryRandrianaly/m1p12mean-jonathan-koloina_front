import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieModeleInsertionComponent } from './categorie-modele-insertion.component';

describe('CategorieModeleInsertionComponent', () => {
  let component: CategorieModeleInsertionComponent;
  let fixture: ComponentFixture<CategorieModeleInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieModeleInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieModeleInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
