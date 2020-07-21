import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerListingComponent } from './buyer-listing.component';

describe('BuyerListingComponent', () => {
  let component: BuyerListingComponent;
  let fixture: ComponentFixture<BuyerListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
