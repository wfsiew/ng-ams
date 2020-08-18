import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEightComponent } from './report-eight.component';

describe('ReportEightComponent', () => {
  let component: ReportEightComponent;
  let fixture: ComponentFixture<ReportEightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
