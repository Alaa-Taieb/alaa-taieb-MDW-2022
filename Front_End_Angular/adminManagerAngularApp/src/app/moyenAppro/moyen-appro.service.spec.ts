import { TestBed } from '@angular/core/testing';

import { MoyenApproService } from './moyen-appro.service';

describe('MoyenApproService', () => {
  let service: MoyenApproService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoyenApproService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
