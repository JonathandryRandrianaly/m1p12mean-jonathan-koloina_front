import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueInsertionComponent } from './marque-insertion.component';

describe('MarqueInsertionComponent', () => {
  let component: MarqueInsertionComponent;
  let fixture: ComponentFixture<MarqueInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarqueInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarqueInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
