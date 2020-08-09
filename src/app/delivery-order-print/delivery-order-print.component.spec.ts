import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderPrintComponent } from './delivery-order-print.component';

describe('DeliveryOrderPrintComponent', () => {
  let component: DeliveryOrderPrintComponent;
  let fixture: ComponentFixture<DeliveryOrderPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOrderPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
