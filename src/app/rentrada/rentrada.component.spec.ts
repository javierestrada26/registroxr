import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentradaComponent } from './rentrada.component';

describe('RentradaComponent', () => {
  let component: RentradaComponent;
  let fixture: ComponentFixture<RentradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
