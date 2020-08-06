import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderCreateComponent } from './delivery-order-create.component';

describe('DeliveryOrderCreateComponent', () => {
  let component: DeliveryOrderCreateComponent;
  let fixture: ComponentFixture<DeliveryOrderCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOrderCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
