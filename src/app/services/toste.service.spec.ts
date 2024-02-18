import { TestBed } from '@angular/core/testing';

import { TosteService } from './toste.service';

describe('TosteService', () => {
  let service: TosteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TosteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
