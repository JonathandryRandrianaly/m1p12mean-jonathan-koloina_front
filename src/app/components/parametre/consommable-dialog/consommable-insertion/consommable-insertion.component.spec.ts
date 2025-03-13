import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsommableInsertionComponent } from './consommable-insertion.component';

describe('ConsommableInsertionComponent', () => {
  let component: ConsommableInsertionComponent;
  let fixture: ComponentFixture<ConsommableInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsommableInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsommableInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
