import { TestBed } from '@angular/core/testing';

import { DetectDeseaseService } from './detect-desease.service';

describe('DetectDeseaseService', () => {
  let service: DetectDeseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetectDeseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
