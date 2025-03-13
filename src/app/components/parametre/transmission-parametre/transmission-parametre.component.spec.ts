import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionParametreComponent } from './transmission-parametre.component';

describe('TransmissionParametreComponent', () => {
  let component: TransmissionParametreComponent;
  let fixture: ComponentFixture<TransmissionParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransmissionParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
