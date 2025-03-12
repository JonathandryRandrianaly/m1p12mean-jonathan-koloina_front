import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheMecanicienComponent } from './tache-mecanicien.component';

describe('TacheMecanicienComponent', () => {
  let component: TacheMecanicienComponent;
  let fixture: ComponentFixture<TacheMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacheMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacheMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
