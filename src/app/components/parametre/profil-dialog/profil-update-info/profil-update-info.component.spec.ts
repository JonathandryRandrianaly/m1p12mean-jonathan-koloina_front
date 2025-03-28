import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUpdateInfoComponent } from './profil-update-info.component';

describe('ProfilUpdateInfoComponent', () => {
  let component: ProfilUpdateInfoComponent;
  let fixture: ComponentFixture<ProfilUpdateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilUpdateInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilUpdateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
