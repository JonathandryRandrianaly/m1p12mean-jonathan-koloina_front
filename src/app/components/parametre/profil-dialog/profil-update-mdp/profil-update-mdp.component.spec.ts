import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUpdateMdpComponent } from './profil-update-mdp.component';

describe('ProfilUpdateMdpComponent', () => {
  let component: ProfilUpdateMdpComponent;
  let fixture: ComponentFixture<ProfilUpdateMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilUpdateMdpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilUpdateMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
