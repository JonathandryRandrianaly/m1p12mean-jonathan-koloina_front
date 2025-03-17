import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsommableUpdateComponent } from './consommable-update.component';

describe('ConsommableUpdateComponent', () => {
  let component: ConsommableUpdateComponent;
  let fixture: ComponentFixture<ConsommableUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsommableUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsommableUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
