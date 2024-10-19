import { TestBed } from '@angular/core/testing';

import { AlumnosControlService } from './alumnos-control.service';

describe('AlumnosControlService', () => {
  let service: AlumnosControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
