import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesreservamalComponent } from './detallesreservamal.component';

describe('DetallesreservamalComponent', () => {
  let component: DetallesreservamalComponent;
  let fixture: ComponentFixture<DetallesreservamalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesreservamalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetallesreservamalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
