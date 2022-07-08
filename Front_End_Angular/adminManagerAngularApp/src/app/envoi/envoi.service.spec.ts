import { TestBed } from '@angular/core/testing';

import { EnvoiService } from './envoi.service';

describe('EnvoiService', () => {
  let service: EnvoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
