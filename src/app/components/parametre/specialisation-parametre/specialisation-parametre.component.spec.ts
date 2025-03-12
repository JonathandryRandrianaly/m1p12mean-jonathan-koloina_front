import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialisationParametreComponent } from './specialisation-parametre.component';

describe('SpecialisationParametreComponent', () => {
  let component: SpecialisationParametreComponent;
  let fixture: ComponentFixture<SpecialisationParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialisationParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialisationParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
