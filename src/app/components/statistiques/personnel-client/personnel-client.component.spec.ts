import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelClientComponent } from './personnel-client.component';

describe('PersonnelClientComponent', () => {
  let component: PersonnelClientComponent;
  let fixture: ComponentFixture<PersonnelClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
