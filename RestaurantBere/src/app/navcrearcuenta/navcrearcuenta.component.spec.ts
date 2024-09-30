import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavcrearcuentaComponent } from './navcrearcuenta.component';

describe('NavcrearcuentaComponent', () => {
  let component: NavcrearcuentaComponent;
  let fixture: ComponentFixture<NavcrearcuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavcrearcuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavcrearcuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
