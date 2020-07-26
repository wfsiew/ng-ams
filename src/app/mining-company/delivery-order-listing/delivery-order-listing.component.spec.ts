import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderListingComponent } from './delivery-order-listing.component';

describe('DeliveryOrderListingComponent', () => {
  let component: DeliveryOrderListingComponent;
  let fixture: ComponentFixture<DeliveryOrderListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOrderListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
