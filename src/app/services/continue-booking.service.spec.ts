import { TestBed } from '@angular/core/testing';

import { ContinueBookingService } from './continue-booking.service';

describe('ContinueBookingService', () => {
  let service: ContinueBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContinueBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
