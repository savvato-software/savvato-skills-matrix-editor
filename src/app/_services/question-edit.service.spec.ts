import { TestBed } from '@angular/core/testing';

import { QuestionEditService } from './question-edit.service';

describe('QuestionEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionEditService = TestBed.get(QuestionEditService);
    expect(service).toBeTruthy();
  });
});
