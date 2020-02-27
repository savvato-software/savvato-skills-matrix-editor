import { TestBed } from '@angular/core/testing';

import { TechProfileApiService } from './tech-profile-api.service';

describe('TechProfileApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechProfileApiService = TestBed.get(TechProfileApiService);
    expect(service).toBeTruthy();
  });
});
