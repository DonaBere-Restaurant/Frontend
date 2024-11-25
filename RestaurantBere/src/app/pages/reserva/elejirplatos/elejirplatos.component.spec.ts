import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElejirplatosComponent } from './elejirplatos.component';

describe('ElejirplatosComponent', () => {
  let component: ElejirplatosComponent;
  let fixture: ComponentFixture<ElejirplatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElejirplatosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ElejirplatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
