import { TestBed } from '@angular/core/testing';

import { FrutaService } from './fruta.service';

describe('FrutaService', () => {
  let service: FrutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
