import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionInsertionComponent } from './transmission-insertion.component';

describe('TransmissionInsertionComponent', () => {
  let component: TransmissionInsertionComponent;
  let fixture: ComponentFixture<TransmissionInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransmissionInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
