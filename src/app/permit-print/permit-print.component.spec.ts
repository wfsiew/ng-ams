import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitPrintComponent } from './permit-print.component';

describe('PermitPrintComponent', () => {
  let component: PermitPrintComponent;
  let fixture: ComponentFixture<PermitPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
