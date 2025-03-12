import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotriciteParametreComponent } from './motricite-parametre.component';

describe('MotriciteParametreComponent', () => {
  let component: MotriciteParametreComponent;
  let fixture: ComponentFixture<MotriciteParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotriciteParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotriciteParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
