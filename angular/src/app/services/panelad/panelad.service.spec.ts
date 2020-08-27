import { TestBed } from '@angular/core/testing';

import { PaneladService } from './panelad.service';

describe('PaneladService', () => {
  let service: PaneladService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaneladService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
