import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilParametreComponent } from './profil-parametre.component';

describe('ProfilParametreComponent', () => {
  let component: ProfilParametreComponent;
  let fixture: ComponentFixture<ProfilParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
