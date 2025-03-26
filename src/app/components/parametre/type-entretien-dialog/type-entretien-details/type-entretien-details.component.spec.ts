import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEntretienDetailsComponent } from './type-entretien-details.component';

describe('TypeEntretienDetailsComponent', () => {
  let component: TypeEntretienDetailsComponent;
  let fixture: ComponentFixture<TypeEntretienDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEntretienDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEntretienDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
