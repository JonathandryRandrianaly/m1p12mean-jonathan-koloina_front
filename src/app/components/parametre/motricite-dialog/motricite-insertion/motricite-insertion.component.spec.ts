import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotriciteInsertionComponent } from './motricite-insertion.component';

describe('MotriciteInsertionComponent', () => {
  let component: MotriciteInsertionComponent;
  let fixture: ComponentFixture<MotriciteInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotriciteInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotriciteInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
