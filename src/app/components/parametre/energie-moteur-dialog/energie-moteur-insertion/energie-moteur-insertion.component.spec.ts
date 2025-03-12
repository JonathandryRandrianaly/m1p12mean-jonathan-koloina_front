import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergieMoteurInsertionComponent } from './energie-moteur-insertion.component';

describe('EnergieMoteurInsertionComponent', () => {
  let component: EnergieMoteurInsertionComponent;
  let fixture: ComponentFixture<EnergieMoteurInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergieMoteurInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergieMoteurInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
