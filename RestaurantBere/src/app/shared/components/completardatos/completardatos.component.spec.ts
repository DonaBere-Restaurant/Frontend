import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletardatosComponent } from './completardatos.component';

describe('CompletardatosComponent', () => {
  let component: CompletardatosComponent;
  let fixture: ComponentFixture<CompletardatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletardatosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompletardatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
