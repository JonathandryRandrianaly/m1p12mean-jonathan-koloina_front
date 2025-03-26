import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierTacheComponent } from './calendrier-tache.component';

describe('CalendrierTacheComponent', () => {
  let component: CalendrierTacheComponent;
  let fixture: ComponentFixture<CalendrierTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendrierTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendrierTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
