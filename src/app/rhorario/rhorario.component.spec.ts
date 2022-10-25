import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhorarioComponent } from './rhorario.component';

describe('RhorarioComponent', () => {
  let component: RhorarioComponent;
  let fixture: ComponentFixture<RhorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RhorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RhorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
