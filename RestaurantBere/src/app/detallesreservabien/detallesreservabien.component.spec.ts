import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesreservabienComponent } from './detallesreservabien.component';

describe('DetallesreservabienComponent', () => {
  let component: DetallesreservabienComponent;
  let fixture: ComponentFixture<DetallesreservabienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesreservabienComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetallesreservabienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
