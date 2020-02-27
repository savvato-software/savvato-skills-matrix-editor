import { TestBed } from '@angular/core/testing';

import { SequenceService } from './sequence.service';

import { HttpClientModule } from '@angular/common/http';

describe('SequenceService', () => {
  let service: SequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule], providers: [SequenceService]});
  });

  it('should be created', () => {
  	const service: SequenceService = TestBed.get(SequenceService);
    expect(service).toBeTruthy();
  });
});
