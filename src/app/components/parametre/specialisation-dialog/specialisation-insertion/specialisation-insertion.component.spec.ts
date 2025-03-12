import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialisationInsertionComponent } from './specialisation-insertion.component';

describe('SpecialisationInsertionComponent', () => {
  let component: SpecialisationInsertionComponent;
  let fixture: ComponentFixture<SpecialisationInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialisationInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialisationInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
