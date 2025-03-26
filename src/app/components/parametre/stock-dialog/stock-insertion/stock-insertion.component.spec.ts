import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInsertionComponent } from './stock-insertion.component';

describe('StockInsertionComponent', () => {
  let component: StockInsertionComponent;
  let fixture: ComponentFixture<StockInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
