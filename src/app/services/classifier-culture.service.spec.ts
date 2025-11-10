import { TestBed } from '@angular/core/testing';

import { ClassifierCultureService } from './classifier-culture.service';

describe('ClassifierCultureService', () => {
  let service: ClassifierCultureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassifierCultureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
