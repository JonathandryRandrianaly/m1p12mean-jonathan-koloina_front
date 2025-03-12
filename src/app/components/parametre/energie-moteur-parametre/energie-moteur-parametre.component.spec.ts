import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergieMoteurParametreComponent } from './energie-moteur-parametre.component';

describe('EnergieMoteurParametreComponent', () => {
  let component: EnergieMoteurParametreComponent;
  let fixture: ComponentFixture<EnergieMoteurParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergieMoteurParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergieMoteurParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
