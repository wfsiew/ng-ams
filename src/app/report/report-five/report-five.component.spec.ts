import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFiveComponent } from './report-five.component';

describe('ReportFiveComponent', () => {
  let component: ReportFiveComponent;
  let fixture: ComponentFixture<ReportFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
