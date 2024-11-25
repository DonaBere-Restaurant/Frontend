import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInformeComponent } from './admin-informe.component';

describe('AdminInformeComponent', () => {
  let component: AdminInformeComponent;
  let fixture: ComponentFixture<AdminInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInformeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
