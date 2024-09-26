import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviniciarsesionComponent } from './naviniciarsesion.component';

describe('NaviniciarsesionComponent', () => {
  let component: NaviniciarsesionComponent;
  let fixture: ComponentFixture<NaviniciarsesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaviniciarsesionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaviniciarsesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
