import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Validador } from './validador';

describe('Validador', () => {
  let component: Validador;
  let fixture: ComponentFixture<Validador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Validador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Validador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
