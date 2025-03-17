import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEntretienUpdateComponent } from './type-entretien-update.component';

describe('TypeEntretienUpdateComponent', () => {
  let component: TypeEntretienUpdateComponent;
  let fixture: ComponentFixture<TypeEntretienUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEntretienUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEntretienUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
