import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleInsertionComponent } from './modele-insertion.component';

describe('ModeleInsertionComponent', () => {
  let component: ModeleInsertionComponent;
  let fixture: ComponentFixture<ModeleInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeleInsertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
