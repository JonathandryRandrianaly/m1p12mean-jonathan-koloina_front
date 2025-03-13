import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueParametreComponent } from './marque-parametre.component';

describe('MarqueParametreComponent', () => {
  let component: MarqueParametreComponent;
  let fixture: ComponentFixture<MarqueParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarqueParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarqueParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
