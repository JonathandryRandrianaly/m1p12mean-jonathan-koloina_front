import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleParametreComponent } from './modele-parametre.component';

describe('ModeleParametreComponent', () => {
  let component: ModeleParametreComponent;
  let fixture: ComponentFixture<ModeleParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeleParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
