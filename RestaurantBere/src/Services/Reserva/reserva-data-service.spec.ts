import { TestBed } from '@angular/core/testing';

import { ReservaDataService } from './reserva-data-service';

describe('ReservaDataService', () => {
  let service: ReservaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
