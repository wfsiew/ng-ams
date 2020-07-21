import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningCompanyListingComponent } from './mining-company-listing.component';

describe('MiningCompanyListingComponent', () => {
  let component: MiningCompanyListingComponent;
  let fixture: ComponentFixture<MiningCompanyListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningCompanyListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningCompanyListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
