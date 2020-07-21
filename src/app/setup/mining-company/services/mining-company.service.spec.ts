import { TestBed } from '@angular/core/testing';

import { MiningCompanyService } from './mining-company.service';

describe('MiningCompanyService', () => {
  let service: MiningCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiningCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
