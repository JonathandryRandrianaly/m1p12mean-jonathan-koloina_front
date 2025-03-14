import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEntretienInsertionComponent } from './type-entretien-insertion.component';

describe('TypeEntretienInsertionComponent', () => {
  let component: TypeEntretienInsertionComponent;
  let fixture: ComponentFixture<TypeEntretienInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEntretienInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEntretienInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
