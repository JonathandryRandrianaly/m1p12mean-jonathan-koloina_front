import { TestBed } from '@angular/core/testing';

import { GeneraliserService } from './generaliser.service';

describe('GeneraliserService', () => {
  let service: GeneraliserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneraliserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
