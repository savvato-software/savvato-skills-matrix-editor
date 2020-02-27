import { TestBed } from '@angular/core/testing';

import { TechProfileModelService } from './tech-profile-model.service';

describe('TechProfileModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechProfileModelService = TestBed.get(TechProfileModelService);
    expect(service).toBeTruthy();
  });
});
