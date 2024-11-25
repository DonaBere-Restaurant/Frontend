import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesreservaComponent } from './detallesreserva.component';

describe('DetallesreservaComponent', () => {
  let component: DetallesreservaComponent;
  let fixture: ComponentFixture<DetallesreservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesreservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesreservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
