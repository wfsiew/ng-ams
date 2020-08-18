import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSevenComponent } from './report-seven.component';

describe('ReportSevenComponent', () => {
  let component: ReportSevenComponent;
  let fixture: ComponentFixture<ReportSevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
