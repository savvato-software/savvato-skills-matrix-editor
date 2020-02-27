import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

import { HttpClientModule } from '@angular/common/http'

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule], providers: [AlertService]});
  });

  it('should be created', () => {
  	const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });
});
