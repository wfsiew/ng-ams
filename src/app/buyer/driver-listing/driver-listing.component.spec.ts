import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverListingComponent } from './driver-listing.component';

describe('DriverListingComponent', () => {
  let component: DriverListingComponent;
  let fixture: ComponentFixture<DriverListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
