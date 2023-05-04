import { TestBed } from '@angular/core/testing';

import { SmliseEditService } from './smlise-edit.service';

describe('SmliseEditService', () => {
  let service: SmliseEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmliseEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
