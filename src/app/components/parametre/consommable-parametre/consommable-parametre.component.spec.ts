import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsommableParametreComponent } from './consommable-parametre.component';

describe('ConsommableParametreComponent', () => {
  let component: ConsommableParametreComponent;
  let fixture: ComponentFixture<ConsommableParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsommableParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsommableParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
