import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockParametreComponent } from './stock-parametre.component';

describe('StockParametreComponent', () => {
  let component: StockParametreComponent;
  let fixture: ComponentFixture<StockParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
