import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningCompanyCreateComponent } from './mining-company-create.component';

describe('MiningCompanyCreateComponent', () => {
  let component: MiningCompanyCreateComponent;
  let fixture: ComponentFixture<MiningCompanyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningCompanyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningCompanyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
