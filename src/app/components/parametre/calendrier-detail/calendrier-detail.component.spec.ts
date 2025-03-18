import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierDetailComponent } from './calendrier-detail.component';

describe('CalendrierDetailComponent', () => {
  let component: CalendrierDetailComponent;
  let fixture: ComponentFixture<CalendrierDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendrierDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendrierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
