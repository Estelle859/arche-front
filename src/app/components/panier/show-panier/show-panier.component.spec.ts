import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPanierComponent } from './show-panier.component';

describe('ShowPanierComponent', () => {
  let component: ShowPanierComponent;
  let fixture: ComponentFixture<ShowPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPanierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
