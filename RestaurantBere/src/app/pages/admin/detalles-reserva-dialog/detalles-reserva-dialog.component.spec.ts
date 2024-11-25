import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesReservaDialogComponent } from './detalles-reserva-dialog.component';

describe('DetallesReservaDialogComponent', () => {
  let component: DetallesReservaDialogComponent;
  let fixture: ComponentFixture<DetallesReservaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesReservaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesReservaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
