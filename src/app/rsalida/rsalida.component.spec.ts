import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsalidaComponent } from './rsalida.component';

describe('RsalidaComponent', () => {
  let component: RsalidaComponent;
  let fixture: ComponentFixture<RsalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
