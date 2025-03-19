import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTacheFichierComponent } from './detail-tache-fichier.component';

describe('DetailTacheFichierComponent', () => {
  let component: DetailTacheFichierComponent;
  let fixture: ComponentFixture<DetailTacheFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTacheFichierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTacheFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
