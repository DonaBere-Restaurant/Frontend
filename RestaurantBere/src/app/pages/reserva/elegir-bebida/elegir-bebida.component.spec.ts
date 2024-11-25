import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirBebidaComponent } from './elegir-bebida.component';

describe('ElegirBebidaComponent', () => {
  let component: ElegirBebidaComponent;
  let fixture: ComponentFixture<ElegirBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElegirBebidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElegirBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
