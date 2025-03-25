import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTacheConsommableComponent } from './detail-tache-consommable.component';

describe('DetailTacheConsommableComponent', () => {
  let component: DetailTacheConsommableComponent;
  let fixture: ComponentFixture<DetailTacheConsommableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTacheConsommableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTacheConsommableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
