import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteParametreComponent } from './unite-parametre.component';

describe('UniteParametreComponent', () => {
  let component: UniteParametreComponent;
  let fixture: ComponentFixture<UniteParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniteParametreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniteParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
