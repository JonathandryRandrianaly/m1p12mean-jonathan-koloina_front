import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteInsertionComponent } from './unite-insertion.component';

describe('UniteInsertionComponent', () => {
  let component: UniteInsertionComponent;
  let fixture: ComponentFixture<UniteInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniteInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniteInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
